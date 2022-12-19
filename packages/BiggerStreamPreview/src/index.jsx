import React from 'react';

const { Webpack, ContextMenu } = BdApi;
const { Filters } = Webpack;

const openModal = Webpack.getModule(Filters.byStrings("modalKey", "Layer", "onCloseCallback"), { searchExports: true });

const ModalRoot = Webpack.getModule(Filters.byStrings("impressionType", "MODAL"), { searchExports: true });
const ImageModal = Webpack.getModule(Filters.byStrings("renderMobileCloseButton"), { searchExports: true });
const ModalSize = Webpack.getModule(Filters.byProps("DYNAMIC"), { searchExports: true });

const MaskedLink = Webpack.getModule(m => m?.type?.toString()?.includes("MASKED_LINK"), { searchExports: true });

const useStateFromStores = Webpack.getModule(Filters.byStrings("useStateFromStores"), { searchExports: true });

const StreamStore = Webpack.getModule(Filters.byProps("getStreamForUser"));
const StreamPreviewStore = Webpack.getModule(Filters.byProps("getPreviewURL"));

const imageModalStyles = Webpack.getModule(Filters.byProps("modal", "image"));

export default class BiggerStreamPreview {
    start() {
        this.patchUserContextMenu();
        this.patchStreamContextMenu();
    }

    stop() {
        this.unpatchUserContextMenu();
        this.unpatchStreamContextMenu();
    }

    patchUserContextMenu() {
        ContextMenu.patch("user-context", this.handleUserContextMenu);
    }

    unpatchUserContextMenu() {
        ContextMenu.unpatch("user-context", this.handleUserContextMenu);
    }

    patchStreamContextMenu() {
        ContextMenu.patch("stream-context", this.handleStreamContextMenu);
    }

    unpatchStreamContextMenu() {
        ContextMenu.unpatch("stream-context", this.handleStreamContextMenu);
    }

    appendStreamPreviewMenuGroup(menu, previewUrl) {
        menu.props.children.splice(
            menu.props.children.length - 1,
            0,
            this.buildStreamPreviewMenuGroup(previewUrl)
        );
    }

    buildStreamPreviewMenuGroup(previewUrl) {
        return (
            <ContextMenu.Group>
                <ContextMenu.Item
                    id="stream-preview"
                    label="View Stream Preview"
                    action={() => this.openImageModal(previewUrl)}
                    disabled={!previewUrl}
                />
            </ContextMenu.Group>
        );
    }

    openImageModal(previewUrl) {
        openModal(props => (
            <ModalRoot className={imageModalStyles.modal} size={ModalSize.DYNAMIC} {...props}>
                <ImageModal
                    className={imageModalStyles.image}
                    shouldAnimate={true}
                    original={previewUrl}
                    placeholder={previewUrl}
                    src={previewUrl}
                    renderLinkComponent={props => <MaskedLink {...props} />}
                />
            </ModalRoot>
        ));
    }

    handleUserContextMenu = (menu, { user }) => {
        const [stream, previewUrl] = useStateFromStores([StreamStore, StreamPreviewStore], () => {
            const stream = StreamStore.getStreamForUser(user.id);
            const previewUrl = stream && StreamPreviewStore.getPreviewURL(
                stream.guildId,
                stream.channelId,
                stream.ownerId
            );

            return [stream, previewUrl];
        });

        if (stream) {
            this.appendStreamPreviewMenuGroup(menu, previewUrl);
        }
    };

    handleStreamContextMenu = (menu, { stream }) => {
        const previewUrl = useStateFromStores([StreamPreviewStore], () => StreamPreviewStore.getPreviewURL(
            stream.guildId,
            stream.channelId,
            stream.ownerId
        ));

        this.appendStreamPreviewMenuGroup(menu.props.children, previewUrl);
    };
}
