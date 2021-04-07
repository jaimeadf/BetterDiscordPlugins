const TerserPlugin = require('terser-webpack-plugin');

const BdWrapperPlugin = require('./BdWrapperPlugin');
const findPlugins = require('./utils/findPlugins');

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
        extensions: ['.js', '.jsx']
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
        ...plugins.map(plugin => new BdWrapperPlugin({
            entryName: plugin.folder,
            manifest: plugin.manifest
        }))
    ],
    externals: {
        react: ['global BdApi', 'React'],
        electron: 'commonjs2 electron',
        request: 'commonjs2 request',
        '@bandagedbd/bdapi': 'assign {BdApi: global.BdApi}',
        '@zlibrary': 'assign BoundedLibrary',
        '@zlibrary/plugin': 'assign Plugin'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: /^(\**!)|@preserve|@license|@cc_on|@end/i
                    }
                },
                extractComments: false
            })
        ]
    }
};
