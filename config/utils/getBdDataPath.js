const path = require('path');

function getBdDataPath() {
    const dataPath = process.env.APPDATA || process.env.XDG_CONFIG_HOME
        || (process.platform === 'darwin'
            ? `${process.env.HOME}/Library/Application Support`
            : `${process.env.HOME}/.config`);

    return path.join(dataPath, 'BetterDiscord');
}

module.exports = getBdDataPath;
