import { WebpackModules, Patcher } from '@zlibrary/api';

const ContextMenuActions = WebpackModules.getByProps('openContextMenuLazy');

function listenContextMenuOpening(callback) {
    return Patcher.before(ContextMenuActions, 'openContextMenuLazy', (thisObject, args) => {
        const importComponent = args[1];

        args[1] = async () => {
            const wrapperComponent = await importComponent(...arguments);

            return props => {
                const wrapper = wrapperComponent(props);

                callback(wrapper);

                return wrapper;
            };
        };
    });
}

export default listenContextMenuOpening;
