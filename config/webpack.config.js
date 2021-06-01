const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

const BdWrapperPlugin = require('./BdWrapperPlugin');
const { findPlugins, getBdDataPath } = require('./utils');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    const isProduction = argv.mode === 'production';

    const plugins = findPlugins();

    return {
        target: 'node',
        entry: Object.fromEntries(plugins.map(plugin => [plugin.folder, plugin.path])),
        output: {
            filename: isDevelopment ? '[name].plugin.js' : '[name]/[name].plugin.js',
            path: isDevelopment ? path.join(getBdDataPath(), 'plugins') : path.resolve(__dirname, '..', 'dist'),
            clean: isProduction,
            library: {
                type: 'var',
                name: 'plugin',
                export: 'default'
            }
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@discord': path.resolve(__dirname, '..', 'src', '@discord')
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    use: ['raw-loader', 'sass-loader']
                },
                {
                    test: /\.svg$/,
                    use: '@svgr/webpack'
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: 'url-loader'
                },
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: '@sucrase/webpack-loader',
                            options: {
                                production: isProduction,
                                transforms: ['jsx']
                            }
                        },
                        'eslint-loader'
                    ]
                }
            ]
        },
        plugins: [
            ...plugins.map(plugin => {
                return new BdWrapperPlugin({
                    entryName: plugin.folder,
                    manifest: plugin.manifest
                });
            }),
            isProduction &&
                new CopyPlugin({
                    patterns: plugins.map(plugin => ({
                        from: path.join(plugin.path, 'README.md'),
                        to: path.join(plugin.folder, 'README.md')
                    }))
                })
        ].filter(Boolean),
        externals: {
            react: ['global BdApi', 'React'],
            'react-dom': ['global BdApi', 'ReactDOM'],
            electron: 'commonjs2 electron',
            request: 'commonjs2 request',
            moment: ['assign BoundedLibrary', 'DiscordModules', 'Moment'],
            '@bandagedbd/bdapi': 'assign {BdApi: global.BdApi}',
            '@zlibrary/api': 'assign BoundedLibrary',
            '@zlibrary/plugin': 'assign Plugin'
        },
        optimization: {
            minimize: false
        }
    };
};
