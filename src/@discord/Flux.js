import { WebpackModules } from '@zlibrary/api';

const {
    Dispatcher,
    Store,
    BatchedStoreListener,
    useStateFromStores,
    useStateFromStoresArray,
    useStateFromStoresObject,
    default: Flux
} = WebpackModules.getByProps('Store', 'default');

export {
    Dispatcher,
    Store,
    BatchedStoreListener,
    useStateFromStores,
    useStateFromStoresArray,
    useStateFromStoresObject
};

export default Flux;
