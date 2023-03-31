import { BoundedBdApi } from '../environment';
import { useStateFromStores } from '../hooks/useStateFromStores';

const { Webpack } = BoundedBdApi;
const { Filters } = Webpack;

const Flux = Webpack.getModule(Filters.byProps('Store', 'connectStores'));
const Dispatcher = Webpack.getModule(Filters.byPrototypeFields('dispatch'), { searchExports: true });

export const ActionTypes = {
    SETTINGS_UPDATE: 'BD_WHO_REACTED_SETTINGS_UPDATE'
};

class DefaultSettingsStore extends Flux.Store {
    constructor(defaults) {
        super(new Dispatcher(), {
            [ActionTypes.SETTINGS_UPDATE]: () => this.save()
        });

        this.defaults = defaults;
        this.settings = {};
    }

    update(name, value) {
        this.settings[name] = value;
        this._dispatchUpdate();
    }

    getSettings() {
        return this.settings;
    }

    getDefaultSettings() {
        return this.defaults;
    }

    load() {
        this.settings = { ...this.defaults, ...BoundedBdApi.Data.load('settings') };
        this._dispatchUpdate();
    }

    save() {
        BoundedBdApi.Data.save('settings', this.settings);
    }

    _dispatchUpdate() {
        this._dispatcher.dispatch({
            type: ActionTypes.SETTINGS_UPDATE
        });
    }
}

export const SettingsStore = new DefaultSettingsStore({
    max: 6,
    avatarSize: 24,
    avatarOverlap: 100 / 3,
    avatarSpacing: 100 / 12,
    emojiThreshold: 10,
    reactionsTotalThreshold: 500,
    reactionsPerEmojiThreshold: 100,
    hideSelf: false,
    hideBots: false,
    hideBlocked: false
});

export function useSettings() {
    return useStateFromStores([SettingsStore], () => [
        SettingsStore.getSettings(),
        SettingsStore.getDefaultSettings(),
        (name, value) => SettingsStore.update(name, value)
    ]);
}
