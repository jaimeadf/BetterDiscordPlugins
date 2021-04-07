const path = require('path');
const { merge } = require('webpack-merge');

const { getBdDataPath } = require('./utils');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].plugin.js',
        path: path.join(getBdDataPath(), 'plugins')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: '@sucrase/webpack-loader',
                    options: {
                        transforms: ['jsx']
                    }
                }
            }
        ]
    }
});
