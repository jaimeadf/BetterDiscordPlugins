/**
 * @name BiggerStreamPreview
 * @description Adds a button in the context menu to see bigger stream previews.
 * @version 1.1.0
 * @author Marmota (Jaime Filho)
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/BiggerStreamPreview
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/BiggerStreamPreview
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 */
/*@cc_on
@if (@_jscript)
var shell = WScript.CreateObject("WScript.Shell");
var fs = new ActiveXObject("Scripting.FileSystemObject");
var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
var pathSelf = WScript.ScriptFullName;
shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
} else if (!fs.FolderExists(pathPlugins)) {
shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
} else if (shell.Popup("Should I move myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
fs.MoveFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)));
shell.Exec("explorer " + pathPlugins);
shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
}
WScript.Quit();
@else@*/
module.exports = ((_) => {
  const config = {
    info: {
      name: "BiggerStreamPreview",
      authors: [
        { name: "Marmota (Jaime Filho)", discord_id: "289112759948410881" },
        {
          name: "Ahlawat",
          discord_id: "887483349369765930",
          github_username: "Tharki-God",
        },
      ],
      version: "1.1.0",
      description:
        "Adds a button in the context menu to see bigger stream previews.",
      github:
        "https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/BiggerStreamPreview",
      github_raw:
        "https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/BiggerStreamPreview/BiggerStreamPreview.plugin.js",
    },
    changelog: [
      {
        title: "Unbroked",
        type: "fixed",
        items: ["Fixed after discord broke it."],
      },
    ],
  };
  return !window.hasOwnProperty("ZeresPluginLibrary")
    ? class {
        load() {
          BdApi.showConfirmationModal(
            "ZLib Missing",
            `The library plugin (ZeresPluginLibrary) needed for ${config.info.name} is missing. Please click Download Now to install it.`,
            {
              confirmText: "Download Now",
              cancelText: "Cancel",
              onConfirm: () => this.downloadZLib(),
            }
          );
        }
        async downloadZLib() {
          const fs = require("fs");
          const path = require("path");
          const ZLib = await fetch(
            "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js"
          );
          if (!ZLib.ok) return this.errorDownloadZLib();
          const ZLibContent = await ZLib.text();
          try {
            await fs.writeFile(
              path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
              ZLibContent,
              (err) => {
                if (err) return this.errorDownloadZLib();
              }
            );
          } catch (err) {
            return this.errorDownloadZLib();
          }
        }
        errorDownloadZLib() {
          const { shell } = require("electron");
          BdApi.showConfirmationModal(
            "Error Downloading",
            [
              `ZeresPluginLibrary download failed. Manually install plugin library from the link below.`,
            ],
            {
              confirmText: "Download",
              cancelText: "Cancel",
              onConfirm: () => {
                shell.openExternal(
                  "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js"
                );
              },
            }
          );
        }
        start() {}
        stop() {}
      }
    : (([Plugin, Library]) => {
        const {
          WebpackModules,
          Logger,
          PluginUpdater,
          DiscordModules: {
            StreamStore,
            StreamPreviewStore,
            ModalActions,
            ModalRoot,
            React,
          },
        } = Library;
        const { ContextMenu } = BdApi;
        const Flux = Object.assign(
          {},
          WebpackModules.getByProps("Store", "connectStores"),
          WebpackModules.getModule((m) =>
            m?.ZP?.toString().includes("useStateFromStores")
          )
        );
        const Anchor = WebpackModules.getModule((m) =>
          ["anchorUnderlineOnHover", "noreferrer noopener"].every((s) =>
            m?.toString().includes(s)
          )
        );
        const ModalComponents = {
          Module: WebpackModules.getModule((m) =>
            [".renderModal,", "onCloseRequest"].every((s) =>
              Object.values(m).some((m) => m?.toString?.().includes(s))
            )
          ),
          get Modal() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes(".renderModal")
            );
          },
          get ModalCloseButton() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes("closeWithCircle")
            );
          },
          get ModalContent() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes(".content,")
            );
          },
          get ModalFooter() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes(".footer,")
            );
          },
          get ModalHeader() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes(".headerId")
            );
          },
          get ModalListContent() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes(".scrollerRef")
            );
          },
          get ModalRoot() {
            return Object.values(this.Module).find((m) =>
              m.toString().includes(".transitionState", ".size")
            );
          },
          get ModalSize() {
            return Object.values(this.Module).find(
              (m) =>
                typeof m == "object" &&
                JSON.stringify(m).includes("DYNAMIC", "SMALL")
            );
          },
        };
        const ImageModal = WebpackModules.getModule((m) =>
          ["mobileCloseWrapper", "closeAction"].every((s) =>
            m?.toString().includes(s)
          )
        );
        const fetchImage = (url) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", () =>
              reject("Unable to fetch image.")
            );
          });

        return class BiggerStreamPreview extends Plugin {
          constructor() {
            super();
            this.patchUserContextMenus = this.patchUserContextMenus.bind(this);
            this.patchStreamContextMenu =
              this.patchStreamContextMenu.bind(this);
          }
          checkForUpdates() {
            try {
              PluginUpdater.checkForUpdate(
                config.info.name,
                config.info.version,
                config.info.github_raw
              );
            } catch (err) {
              Logger.err("Plugin Updater could not be reached.", err);
            }
          }
          onStart() {
            this.checkForUpdates();
            this.patchMenus();
          }
          patchMenus() {
            ContextMenu.patch("user-context", this.patchUserContextMenus);
            ContextMenu.patch("stream-context", this.patchStreamContextMenu);
          }
          patchUserContextMenus(menu, { user }) {
            const [stream, previewURL] = Flux.ZP(
              [StreamStore, StreamPreviewStore],
              () => {
                const stream = StreamStore.getStreamForUser(user.id);
                const previewURL = stream
                  ? StreamPreviewStore.getPreviewURL(
                      stream.guildId,
                      stream.channelId,
                      stream.ownerId
                    )
                  : null;
                return [stream, previewURL];
              }
            );
            if (!stream) return;
            menu.props.children.push(this.buildPreviewMenuItem(previewURL));
          }
          patchStreamContextMenu(menu, { stream }) {
            const previewURL = Flux.ZP([StreamPreviewStore], () => {
              return StreamPreviewStore.getPreviewURL(
                stream.guildId,
                stream.channelId,
                stream.ownerId
              );
            });
            menu.props.children.props.children.push(
              this.buildPreviewMenuItem(previewURL)
            );
          }
          buildPreviewMenuItem(previewURL) {
            return ContextMenu.buildItem({
              label: "View Stream Preview",
              id: "stream-preview",
              disabled: previewURL === null,
              action: () => this.openImageModal(previewURL),
            });
          }
          async openImageModal(url) {
            const image = await fetchImage(url);
            ModalActions.openModal((modalData) =>
              React.createElement(
                ModalRoot,
                Object.assign({}, modalData, {
                  className: "modal-3Crloo",
                  size: ModalComponents.ModalSize.DYNAMIC,
                }),
                React.createElement(ImageModal, {
                  animated: false,
                  src: url,
                  original: url,
                  width: image.width,
                  height: image.height,
                  className: "image-36HiZc",
                  shouldAnimate: true,
                  renderLinkComponent: (props) =>
                    React.createElement(Anchor, props),
                  children: null,
                })
              )
            );
          }
          unpatchMenus() {
            ContextMenu.unpatch("user-context", this.patchUserContextMenus);
            ContextMenu.unpatch("stream-context", this.patchStreamContextMenu);
          }
          onStop() {
            this.unpatchMenus();
          }
        };
        return plugin(Plugin, Library);
      })(window.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
