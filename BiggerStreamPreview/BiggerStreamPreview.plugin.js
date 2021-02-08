/**
 * @name BiggerStreamPreview
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/BiggerStreamPreview
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/blob/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 */

/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/

/// <reference types="bandagedbd/bdapi" />

const request = require("request");
const path = require("path");
const fs = require("fs");
const electron = require("electron");

const config = {
    info: {
        name: "BiggerStreamPreview",
        authors: [
            {
                name: "Jaime Filho",
                discord_id: "289112759948410881",
                github_username: "jaimeadf"
            }
        ],
        version: "1.0.4",
        description: "Allows you to see bigger previews of streams via the context menu.",
        github: "https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/BiggerStreamPreview",
        github_raw: "https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js",
        changelog: [
            {
                title: "New meta",
                items: [
                    "Added website."
                ]
            }
        ]
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(", ");
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                        if (error)
                            return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");

                        fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                    });
                }
            });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } = Library;
    const { React, StreamStore, StreamPreviewStore, ModalStack } = DiscordModules;

    const ImageModal = WebpackModules.getByDisplayName("ImageModal");
    const MaskedLink = WebpackModules.getByDisplayName("MaskedLink");

    class BiggerStreamPreview extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            this.patchUserContextMenus();
        }

        onStop() {
            Patcher.unpatchAll();
        }

        patchUserContextMenus() {
            const UserContextMenus = WebpackModules.findAll(
                m => m.default && m.default.displayName.includes("UserContextMenu"));

            const patch = (thisObject, [props], returnValue) => {
                const { user } = props;

                const stream = StreamStore.getStreamForUser(user.id);
                if (!stream) return;

                const previewURL = StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId);

                returnValue.props.children.props.children.push(
                    DiscordContextMenu.buildMenuItem({
                        type: "separator"
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: "View Stream Preview",
                        action: async () => {
                            await this.showImageModal(previewURL)
                        },
                        disabled: previewURL === null
                    })
                );
            };

            for (const UserContextMenu of UserContextMenus) {
                Patcher.after(UserContextMenu, "default", patch);
            }
        }

        async showImageModal(url) {
            const image = await this.fetchImage(url);
            ModalStack.push(
                ImageModal,
                {
                    src: url,
                    placeholder: url,
                    original: url,
                    width: image.width,
                    height: image.height,
                    onClickUntrusted: e => e.openHref(),
                    renderLinkComponent: props => React.createElement(MaskedLink, props)
                }
            )
        }

        async fetchImage(url) {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = url;

                image.addEventListener("load", () => {
                    resolve(image);
                });

                image.addEventListener("error", () => {
                    reject(new Error("Image not found"))
                });
            });
        }
    }

    return BiggerStreamPreview;
})(global.ZeresPluginLibrary.buildPlugin(config));

/*@end@*/
