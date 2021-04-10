import { Patcher, WebpackModules } from '@zlibrary';
import Plugin from '@zlibrary/plugin';

const { WebAudioSound } = WebpackModules.getByProps('WebAudioSound');

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
