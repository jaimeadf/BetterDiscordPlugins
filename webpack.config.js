const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function generatePluginConfig(pluginPath) {
    const manifest = readManifest(pluginPath);

    const bdHeader = buildBdHeader(manifest);
    const bdPluginsPath = getBdPluginsPath();

    return (env, argv) => {
        const isProduction = argv.mode === 'production';

        return {
            target: "node",
            entry: pluginPath,
            output: {
                clean: isProduction,
                filename: `${manifest.name}.plugin.js`,
                path: isProduction ? path.join(pluginPath, 'build') : bdPluginsPath,
                library: {
                    type: "commonjs2",
                    export: "default"
                }
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "swc-loader",
                            options: {
                                jsc: {
                                    target: "es2020",
                                    parser: {
                                        syntax: "ecmascript",
                                        jsx: true
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            },
            optimization: {
                minimize: false
            },
            plugins: [
                new webpack.BannerPlugin({ banner: bdHeader.toString(), raw: true }),
                isProduction && new CopyPlugin({
                    patterns: [
                        path.join(pluginPath, "README.md")
                    ]
                })
            ].filter(Boolean),
            externals: {
                react: ["global BdApi", "React"]
            }
        }
    };
};

function readManifest(pluginPath) {
    return require(path.join(pluginPath, "package.json"));
}

function buildBdHeader(manifest) {
    const header = new BdHeader();

    header.set("name", manifest.name);
    header.set("author", manifest.author);
    header.set("authorLink", manifest.authorLink);
    header.set("description", manifest.description);
    header.set("version", manifest.version);
    header.set("source", manifest.source);

    return header;
}

function getBdPluginsPath() {
    const dataPath =
        process.env.APPDATA ||
        process.env.XDG_CONFIG_HOME ||
        (process.platform === "darwin"
            ? `${process.env.HOME}/Library/Application Support`
            : `${process.env.HOME}/.config`);

    return path.join(dataPath, "BetterDiscord", "plugins");
}

class BdHeader {
    constructor() {
        this.properties = new Map();
    }

    set(name, value) {
        if (!value) return;
        this.properties.set(name, value);
    }

    remove(name) {
        this.properties.delete(name);
    }

    toString() {
        let result = "/**\n";

        for (const [name, value] of this.properties) {
            result += ` * @${name} ${value}\n`;
        }

        result += " */";

        return result;
    }
}
