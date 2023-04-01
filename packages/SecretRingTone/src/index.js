const BoundedBdApi = new BdApi('SecretRingTone');

const { Webpack, Patcher } = BoundedBdApi;
const { Filters } = Webpack;

const WebAudioSound = Webpack.getModule(Filters.byPrototypeFields('_ensureAudio'), { searchExports: true });

export default class SecretRingTone {
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
