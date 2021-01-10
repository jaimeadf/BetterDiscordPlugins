/**
 * @name BiggerStreamPreview
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/blob/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 */

/// <reference types="bandagedbd/bdapi" />

const request = require('request');
const path = require('path');
const fs = require('fs');
const electron = require('electron');

const config = {
    info: {
        name: 'BiggerStreamPreview',
        authors: [
            {
                name: 'Jaime Filho',
                discord_id: '289112759948410881',
                github_username: 'jaimeadf'
            }
        ],
        version: '1.0.0',
        description: 'Allows you to see bigger previews of streams via the context menu.',
        github: 'https://github.com/jaimeadf/BetterDiscordPlugins/blob/main/BiggerStreamPreview',
        github_raw: 'https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js'
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(', ');
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal('Library plugin is needed',
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: 'Download',
                cancelText: 'Cancel',
                onConfirm: () => {
                    request.get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', (error, response, body) => {
                        if (error)
                            return electron.shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');

                        fs.writeFileSync(path.join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body);
                    });
                }
            });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } = Library;
    const { React, ModalStack } = DiscordModules;

    const StreamStore = WebpackModules.getByProps('getAllActiveStreams', 'getStreamForUser');
    const StreamPreviewStore = WebpackModules.getByProps('getIsPreviewLoading', 'getPreviewURL');
    const ImageModal = WebpackModules.getByDisplayName('ImageModal');
    const MaskedLink = WebpackModules.getByDisplayName('MaskedLink');

    class BiggerStreamPreview extends Plugin {
        constructor() {
            super();
            this.contextMenusUnpatches = [];
        }

        onStart() {
            this.bindContextMenus();
        }

        onStop() {
            this.unbindContextMenus();
        }

        bindContextMenus() {
            this.patchUserContextMenus();
        }

        unbindContextMenus() {
            for (const unpatch of this.contextMenusUnpatches) {
                unpatch();
            }
        }

        patchUserContextMenus() {
            const UserContextMenus = WebpackModules.findAll(
                m => m.default && m.default.displayName.includes('UserContextMenu'));

            const patch = (self, [props], returnValue) => {
                const { user } = props;

                const stream = StreamStore.getStreamForUser(user.id);
                if (!stream) return;

                const previewURL = StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId);

                returnValue.props.children.props.children.push(
                    DiscordContextMenu.buildMenuItem({
                        type: 'separator'
                    }),
                    DiscordContextMenu.buildMenuItem({
                        label: 'View Stream Preview',
                        action: async () => {
                            await this.showImage(previewURL)
                        },
                        disabled: previewURL === null
                    })
                );
            };

            for (const UserContextMenu of UserContextMenus) {
                this.contextMenusUnpatches.push(Patcher.after(UserContextMenu, 'default', patch));
            }
        }

        async showImage(url) {
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

                image.addEventListener('load', () => {
                    resolve(image);
                });

                image.addEventListener('error', () => {
                    reject(new Error('Image not found'))
                })
            });
        }
    }

    return BiggerStreamPreview;
})(global.ZeresPluginLibrary.buildPlugin(config));
