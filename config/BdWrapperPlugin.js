const fs = require('fs');
const path = require('path');

const { Compilation, sources: { ConcatSource } } = require('webpack');

const { render } = require('template-file');

const template = fs.readFileSync(path.resolve(__dirname, 'templates', 'plugin.template.js')).toString();

class BdWrapperPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap('BdWrapperPlugin', compilation => {
            const wrapFile = file => {
                compilation.updateAsset(
                    file,
                    old =>
                        new ConcatSource(
                            render(template, {
                                serializedConfig: JSON.stringify(this.buildConfig()),
                                code: old.buffer().toString()
                            })
                        )
                );
            };

            compilation.hooks.processAssets.tap(
                {
                    name: 'BdWrapperPlugin',
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
                },
                () => {
                    for (const chunk of compilation.chunks) {
                        const modules = compilation.chunkGraph.getChunkModules(chunk).flatMap(module => module?.modules ?? [module]);
                        if (!modules.some(module => module.userRequest === "@zlibrary/plugin")) continue;

                        for (const file of chunk.files) {
                            wrapFile(file);
                        }
                    }
                }
            );
        });
    }

    buildConfig() {
        const { manifest } = this.options;

        return {
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
        };
    }
}

module.exports = BdWrapperPlugin;
