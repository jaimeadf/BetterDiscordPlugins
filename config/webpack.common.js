const path = require('path');

const BdWrapperPlugin = require('./BdWrapperPlugin');
const { findPlugins } = require('./utils');

const plugins = findPlugins();

module.exports = {
    target: 'node',
    entry: Object.fromEntries(plugins.map(plugin => [plugin.folder, plugin.path])),
    output: {
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
            }
        ]
    },
    plugins: [
        ...plugins.map(
            plugin =>
                new BdWrapperPlugin({
                    entryName: plugin.folder,
                    manifest: plugin.manifest
                })
        )
    ],
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
