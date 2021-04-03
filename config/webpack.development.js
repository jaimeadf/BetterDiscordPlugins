const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

function getBdDataPath() {
    const dataPath = process.env.APPDATA || (process.platform === 'darwin'
        ? `${process.env.HOME}/Library/Application Support`
        : `${process.env.HOME}/.local/share`);

    return path.join(dataPath, 'BetterDiscord');
}

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
