import React from 'react';

import { DiscordModules, WebpackModules, Patcher, DiscordContextMenu } from '@zlibrary/api';
import Plugin from '@zlibrary/plugin';

import { useStateFromStores } from '@discord/Flux';

const { StreamStore, StreamPreviewStore, ModalStack } = DiscordModules;

const ImageModal = WebpackModules.getByDisplayName('ImageModal');
const MaskedLink = WebpackModules.getByDisplayName('MaskedLink');

export default class BiggerStreamPreview extends Plugin {
    onStart() {
        this.patchUserContextMenus();
    }

    onStop() {
        Patcher.unpatchAll();
    }

    patchUserContextMenus() {
        const UserContextMenus = WebpackModules.findAll(m => m?.default?.displayName?.includes('UserContextMenu'));

        const patch = (thisObject, [{ user }], returnValue) => {
            const [stream, previewURL] = useStateFromStores([StreamStore, StreamPreviewStore], () => {
                const stream = StreamStore.getStreamForUser(user.id);
                const previewURL = stream
                    ? StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId)
                    : null;

                return [stream, previewURL];
            });

            if (!stream) {
                return;
            }

            this.pushStreamPreviewMenuItems(returnValue, previewURL);
        };

        for (const UserContextMenu of UserContextMenus) {
            Patcher.after(UserContextMenu, 'default', patch);
        }
    }

    pushStreamPreviewMenuItems(menuWrapper, previewURL) {
        menuWrapper.props.children.props.children.push(
            DiscordContextMenu.buildMenuItem({ type: 'separator' }),
            DiscordContextMenu.buildMenuItem({
                label: 'View Stream Preview',
                action: () => this.openImageModal(previewURL),
                disabled: previewURL === null
            })
        );
    }

    async openImageModal(url) {
        const image = await this.fetchImage(url);

        ModalStack.push(() => (
            <ImageModal
                src={url}
                original={url}
                width={image.width}
                height={image.height}
                renderLinkComponent={props => <MaskedLink {...props} />}
            />
        ));
    }

    async fetchImage(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;

            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', () => reject('Unable to fetch image.'));
        });
    }
}
