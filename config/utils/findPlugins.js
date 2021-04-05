const fs = require('fs');
const path = require('path');

const PLUGINS_DIRECTORY = path.resolve('./src');

module.exports = function findPlugins() {
    const plugins = [];

    for (const dirent of fs.readdirSync(PLUGINS_DIRECTORY, { withFileTypes: true })) {
        const pluginPath = path.join(PLUGINS_DIRECTORY, dirent.name);
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
