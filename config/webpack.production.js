const path = require('path');
const { merge } = require('webpack-merge');

const CopyPlugin = require('copy-webpack-plugin');

const { findPlugins } = require('./utils');
const common = require('./webpack.common');

const plugins = findPlugins();

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name]/[name].plugin.js',
        path: path.resolve(__dirname, '..', 'dist'),
        clean: true
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
        new CopyPlugin({
            patterns: plugins.map(plugin => ({
                from: path.join(plugin.path, 'README.md'),
                to: path.join(plugin.folder, 'README.md')
            }))
        })
    ]
});
