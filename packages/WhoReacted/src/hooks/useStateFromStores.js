const { Webpack } = BdApi;
const { Filters } = Webpack;

export const useStateFromStores = Webpack.getModule(
    Filters.byStrings('useStateFromStores'),
    { searchExports: true }
);
