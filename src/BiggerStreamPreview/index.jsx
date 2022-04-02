import React from 'react';

import { DiscordModules, WebpackModules, Patcher, DCM } from '@zlibrary/api';
import Plugin from '@zlibrary/plugin';

import { useStateFromStores } from '@discord/Flux';
import { ModalRoot, ModalSize } from '@discord/components/Modal';

const { StreamStore, StreamPreviewStore, ModalActions } = DiscordModules;

const ImageModal = WebpackModules.getByDisplayName('ImageModal');
const MaskedLink = WebpackModules.getByDisplayName('MaskedLink');

const Menu = WebpackModules.getByProps('MenuItem');

export default class BiggerStreamPreview extends Plugin {
    onStart() {
        this.patchUserContextMenus();
        this.patchStreamContextMenu();
    }

    onStop() {
        Patcher.unpatchAll();
    }

    async patchUserContextMenus() {
        const module = await DCM.getDiscordMenu('useUserRolesItems');

        Patcher.after(module, 'default', (thisObject, [userId], returnValue) => {
            const [stream, previewURL] = useStateFromStores([StreamStore, StreamPreviewStore], () => {
                const stream = StreamStore.getStreamForUser(userId);
                const previewURL = stream
                    ? StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId)
                    : null;

                return [stream, previewURL];
            });

            if (!stream) {
                return;
            }

            return (
                <Menu.MenuGroup>
                    {returnValue}
                    <Menu.MenuSeparator />
                    {this.buildPreviewMenuItem(previewURL)}
                </Menu.MenuGroup>
            );
        });
    }

    async patchStreamContextMenu() {
        const module = await DCM.getDiscordMenu('StreamContextMenu');

        Patcher.after(module, 'default', (thisObject, [{ stream }], returnValue) => {
            const previewURL = useStateFromStores([StreamPreviewStore], () => {
                return StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId);
            });

            returnValue.props.children.props.children.push(
                <Menu.MenuGroup>{this.buildPreviewMenuItem(previewURL)}</Menu.MenuGroup>
            );
        });
    }

    buildPreviewMenuItem(previewURL) {
        return (
            <Menu.MenuItem
                id="stream-preview"
                key="stream-preview"
                label="View Stream Preview"
                action={() => this.openImageModal(previewURL)}
                disabled={previewURL === null}
            />
        );
    }

    async openImageModal(url) {
        const image = await this.fetchImage(url);

        ModalActions.openModal(props => (
            <ModalRoot className="modal-3Crloo" size={ModalSize.DYNAMIC} {...props}>
                <ImageModal
                    className="image-36HiZc"
                    src={url}
                    original={url}
                    width={image.width}
                    height={image.height}
                    renderLinkComponent={props => <MaskedLink {...props} />}
                    shouldAnimate={true}
                />
            </ModalRoot>
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
