/**
 * @name SecretRingTone
 * @author Marmota (Jaime Filho)
 * @authorLink https://github.com/jaimeadf
 * @description Forces discord to play the secret ringtone every time someone calls you instead of the 1 in a 1000 chance of it happening.
 * @version 1.1.0
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/packages/SecretRingTone
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SecretRingTone)
/* harmony export */ });
const BoundedBdApi = new BdApi('SecretRingTone');

const { Webpack, Patcher } = BoundedBdApi;
const { Filters } = Webpack;

const WebAudioSound = Webpack.getModule(Filters.byPrototypeFields('_ensureAudio'), { searchExports: true });

class SecretRingTone {
    constructor() {
        this.sounds = [];
    }

    start() {
        Patcher.before(WebAudioSound.prototype, '_ensureAudio', sound => {
            if (sound.name == 'call_ringing') {
                sound.name = 'call_ringing_beat';
                this.sounds.push(sound);
            }
        });
    }

    stop() {
        Patcher.unpatchAll();

        for (const sound of this.sounds) {
            sound.name = 'call_ringing';
        }

        this.sounds = [];
    }
}

module.exports = __webpack_exports__["default"];
/******/ })()
;