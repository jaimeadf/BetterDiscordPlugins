import { BoundedBdApi } from '../environment';

const { Webpack } = BoundedBdApi;
const { Filters } = Webpack;

export const useStateFromStores = Webpack.getModule(
    Filters.byStrings('useStateFromStores'),
    { searchExports: true }
);
