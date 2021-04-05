const path = require('path');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const findPlugins = require('./utils/findPlugins');
const common = require('./webpack.common');

const plugins = findPlugins();

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name]/[name].plugin.js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: '@sucrase/webpack-loader',
                    options: {
                        production: true,
                        transforms: ['jsx']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: plugins.map(plugin => ({
                from: path.join(plugin.path, 'README.md'),
                to: path.join(plugin.folder, 'README.md')
            }))
        })
    ]
});
