import { WebpackModules, Patcher } from '@zlibrary/api';
import Plugin from '@zlibrary/plugin';

const { j: WebAudioSound } = WebpackModules.find(m => m?.j?.prototype._ensureAudio);

export default class SecretRingTone extends Plugin {
    constructor() {
        super();
        this.ringingSounds = [];
    }

    onStart() {
        Patcher.before(WebAudioSound.prototype, '_ensureAudio', thisObject => {
            if (thisObject.name === 'call_ringing') {
                thisObject.name = 'call_ringing_beat';
                this.ringingSounds.push(thisObject);
            }
        });
    }

    onStop() {
        Patcher.unpatchAll();

        for (const sound of this.ringingSounds) {
            sound.name = 'call_ringing';
        }

        this.ringingSounds = [];
    }
}
