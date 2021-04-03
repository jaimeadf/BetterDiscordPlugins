const path = require('path');
const { renderFile } = require('template-file');

const { default: InjectPlugin, ENTRY_ORDER } = require('webpack-inject-plugin');
const { BannerPlugin } = require('webpack');

class BdMeta {
    constructor() {
        this.properties = new Map();
    }

    set(name, value) {
        if (value === undefined) return;
        this.properties.set(name, value);
    }

    remove(name) {
        this.properties.delete(name);
    }

    toString() {
        let result = '/**!\n';

        for (const [name, value] of this.properties) {
            result += ` * @${name} ${value}\n`;
        }

        result += ' */';

        return result;
    }
}

class BdWrapperPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        const { manifest, importPath } = this.options;

        new InjectPlugin(
            () => renderFile(path.resolve(__dirname, 'plugin.js.template'), {
                importPath: importPath,
                serializedConfig: JSON.stringify({
                    info: {
                        name: manifest.name,
                        description: manifest.description,
                        version: manifest.version,
                        authors: [
                            {
                                name: manifest.author.name,
                                discord_id: manifest.author.id
                            }
                        ],
                        github: manifest.source,
                        github_raw: manifest.updateUrl
                    },
                    changelog: manifest.changelog
                })
            }),
            {
                entryName: name => name === this.options.entryName || name === 'import',
                entryOrder: ENTRY_ORDER.Last
            }
        ).apply(compiler);

        new BannerPlugin({
            banner: this.buildMeta().toString(),
            raw: true,
            entryOnly: true,
            test: this.options.entryName
        }).apply(compiler);
    }

    buildMeta() {
        const { manifest } = this.options;
        const meta = new BdMeta();

        meta.set('name', manifest.name);
        meta.set('description', manifest.description);
        meta.set('version', manifest.version);
        meta.set('author', manifest?.author?.name);
        meta.set('authorId', manifest?.author?.id);
        meta.set('authorLink', manifest?.author?.link);
        meta.set('invite', manifest.invite);
        meta.set('website', manifest.website);
        meta.set('source', manifest.source);
        meta.set('updateUrl', manifest.updateUrl);

        return meta;
    }
}

module.exports = BdWrapperPlugin;
