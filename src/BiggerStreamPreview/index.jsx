import React from 'react';

export default ([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } = Library;
    const { StreamStore, StreamPreviewStore, ModalStack } = DiscordModules;

    const ImageModal = WebpackModules.getByDisplayName('ImageModal');
    const MaskedLink = WebpackModules.getByDisplayName('MaskedLink');

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
                m => m.default && m.default.displayName.includes('UserContextMenu'));

            const patch = (thisObject, [props], returnValue) => {
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
                            await this.showImageModal(previewURL)
                        },
                        disabled: previewURL === null
                    })
                );
            };

            for (const UserContextMenu of UserContextMenus) {
                Patcher.after(UserContextMenu, 'default', patch);
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

                image.addEventListener('load', () => {
                    resolve(image);
                });

                image.addEventListener('error', () => {
                    reject(new Error('Image not found'));
                });
            });
        }
    }

    return BiggerStreamPreview;
};
