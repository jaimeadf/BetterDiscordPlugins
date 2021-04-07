const fs = require('fs');
const path = require('path');

const PLUGINS_PATH = path.resolve('./src');

function findPlugins() {
    const plugins = [];

    for (const dirent of fs.readdirSync(PLUGINS_PATH, { withFileTypes: true })) {
        const pluginPath = path.join(PLUGINS_PATH, dirent.name);
        const manifestPath = path.join(pluginPath, 'manifest.json');

        if (!dirent.isDirectory() || !fs.existsSync(manifestPath)) continue;

        plugins.push({
            folder: dirent.name,
            path: pluginPath,
            manifest: require(manifestPath)
        })
    }

    return plugins;
}

module.exports = findPlugins;
