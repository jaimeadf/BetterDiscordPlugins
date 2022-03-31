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

    patchUserContextMenus() {
        const patch = module => {
            Patcher.after(module, 'default', (thisObject, [ user ], returnValue) => {
                const isMenuItem = typeof user === "string";

                if (isMenuItem) user = BdApi.findModuleByProps('getUser', 'getCurrentUser').getUser(user);
                else({ user } = user);

                if (!user) return;

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
            });
        };

        DCM.getDiscordMenu('useUserRolesItems').then(patch);
    }

    async patchStreamContextMenu() {
        const module = await DCM.getDiscordMenu('StreamContextMenu');

        Patcher.after(module, 'default', (thisObject, [{ stream }], returnValue) => {
            const previewURL = useStateFromStores([StreamPreviewStore], () => {
                return StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId);
            });

            this.pushStreamPreviewMenuItems(returnValue, previewURL);
        });
    }

    pushStreamPreviewMenuItems(menuWrapper, previewURL) {
        menuWrapper.push(
            <Menu.MenuGroup>
                <Menu.MenuItem
                    id="stream-preview"
                    key="stream-preview"
                    label="View Stream Preview"
                    action={() => this.openImageModal(previewURL)}
                    disabled={previewURL === null}
                />
            </Menu.MenuGroup>
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
