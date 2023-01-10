/**
 * @name BiggerStreamPreview
 * @author Marmota (Jaime Filho)
 * @authorLink https://github.com/jaimeadf
 * @description View bigger stream previews via the context menu.
 * @version 1.1.1
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/packages/BiggerStreamPreview
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ BiggerStreamPreview)
});

;// CONCATENATED MODULE: external ["BdApi","React"]
const external_BdApi_React_namespaceObject = global["BdApi"]["React"];
var external_BdApi_React_default = /*#__PURE__*/__webpack_require__.n(external_BdApi_React_namespaceObject);
;// CONCATENATED MODULE: ./src/index.jsx
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

const { Webpack , ContextMenu  } = BdApi;
const { Filters  } = Webpack;
const openModal = Webpack.getModule(Filters.byStrings("modalKey", "Layer", "onCloseCallback"), {
    searchExports: true
});
const ModalRoot = Webpack.getModule(Filters.byStrings("impressionType", "MODAL"), {
    searchExports: true
});
const ImageModal = Webpack.getModule(Filters.byStrings("renderMobileCloseButton"), {
    searchExports: true
});
const ModalSize = Webpack.getModule(Filters.byProps("DYNAMIC"), {
    searchExports: true
});
const MaskedLink = Webpack.getModule((m)=>m?.type?.toString()?.includes("MASKED_LINK"), {
    searchExports: true
});
const useStateFromStores = Webpack.getModule(Filters.byStrings("useStateFromStores"), {
    searchExports: true
});
const StreamStore = Webpack.getModule(Filters.byProps("getStreamForUser"));
const StreamPreviewStore = Webpack.getModule(Filters.byProps("getPreviewURL"));
const imageModalStyles = Webpack.getModule(Filters.byProps("modal", "image"));
class BiggerStreamPreview {
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
        menu.props.children.splice(menu.props.children.length - 1, 0, this.buildStreamPreviewMenuGroup(previewUrl));
    }
    buildStreamPreviewMenuGroup(previewUrl) {
        return /*#__PURE__*/ external_BdApi_React_default().createElement(ContextMenu.Group, null, /*#__PURE__*/ external_BdApi_React_default().createElement(ContextMenu.Item, {
            id: "stream-preview",
            label: "View Stream Preview",
            action: ()=>this.openImageModal(previewUrl),
            disabled: !previewUrl
        }));
    }
    openImageModal(previewUrl) {
        openModal((props)=>/*#__PURE__*/ external_BdApi_React_default().createElement(ModalRoot, _extends({
                className: imageModalStyles.modal,
                size: ModalSize.DYNAMIC
            }, props), /*#__PURE__*/ external_BdApi_React_default().createElement(ImageModal, {
                className: imageModalStyles.image,
                shouldAnimate: true,
                original: previewUrl,
                placeholder: previewUrl,
                src: previewUrl,
                renderLinkComponent: (props)=>/*#__PURE__*/ external_BdApi_React_default().createElement(MaskedLink, _extends({}, props))
            })));
    }
    constructor(){
        _defineProperty(this, "handleUserContextMenu", (menu, { user  })=>{
            const [stream, previewUrl] = useStateFromStores([
                StreamStore,
                StreamPreviewStore
            ], ()=>{
                const stream = StreamStore.getStreamForUser(user.id);
                const previewUrl = stream && StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId);
                return [
                    stream,
                    previewUrl
                ];
            });
            if (stream) {
                this.appendStreamPreviewMenuGroup(menu, previewUrl);
            }
        });
        _defineProperty(this, "handleStreamContextMenu", (menu, { stream  })=>{
            const previewUrl = useStateFromStores([
                StreamPreviewStore
            ], ()=>StreamPreviewStore.getPreviewURL(stream.guildId, stream.channelId, stream.ownerId));
            this.appendStreamPreviewMenuGroup(menu.props.children, previewUrl);
        });
    }
}


module.exports = __webpack_exports__["default"];
/******/ })()
;