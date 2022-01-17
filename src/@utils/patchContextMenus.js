import { Patcher } from '@zlibrary/api';
import listenContextMenuOpening from './listenContextMenuOpening';

function patchContextMenus(criteria, patch) {
    if (typeof criteria !== 'function') {
        const matcher = criteria;

        criteria = ContextMenu => {
            return ContextMenu.displayName?.match(matcher);
        };
    }

    return listenContextMenuOpening(wrapper => {
        const { type: ContextMenu } = wrapper;

        if (criteria(ContextMenu)) {
            return Patcher.after(wrapper, 'type', patch);
        }
    });
}

export default patchContextMenus;
