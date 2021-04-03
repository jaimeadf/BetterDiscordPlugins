const path = require('path');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common');

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
            patterns: [
                { from: 'src/WhoReacted/README.md', to: 'WhoReacted/README.md' },
                { from: 'src/BiggerStreamPreview/README.md', to: 'BiggerStreamPreview/README.md' }
            ]
        })
    ]
});
