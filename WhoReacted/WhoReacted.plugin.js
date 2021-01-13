/**
 * @name WhoReacted
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/blob/main/WhoReacted/WhoReacted.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/WhoReacted/WhoReacted.plugin.js
 */

/// <reference types="bandagedbd/bdapi" />

const request = require("request");
const path = require("path");
const fs = require("fs");
const electron = require("electron");

const config = {
    info: {
        name: "WhoReacted",
        authors: [
            {
                name: "Jaime Filho",
                discord_id: "289112759948410881",
                github_username: "jaimeadf"
            }
        ],
        version: "1.0.0",
        description: "Shows the avatars of the users who reacted to a message.",
        github: "https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/WhoReacted",
        github_raw: "https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/WhoReacted/WhoReacted.plugin.js"
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(", ");
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                        if (error)
                            return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");

                        fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                    });
                }
            });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { Patcher, DiscordModules, WebpackModules, PluginUtilities } = Library;
    const { React, ReactDOM } = DiscordModules;

    const ReactionManager = WebpackModules.getByProps("getReactions", "addReaction", "removeReaction");
    const ReactionStore = WebpackModules.getByProps("getReactions", "_changeCallbacks");

    class WhoReacted extends Plugin {
        get css() {
            return `           
                .reactors-wrapper > div:not(:empty) {
                    margin-left: 6px;
                }
            `;
        }

        constructor() {
            super();
            this.reactionPatches = [];
        }

        onStart() {
            PluginUtilities.addStyle(this.getName(), this.css);
            this.patchReaction();
        }

        onStop() {
            PluginUtilities.removeStyle(this.getName());
            this.unpatchReaction();
        }

        patchReaction() {
            const UserSummaryItem = WebpackModules.find(m => m.default?.displayName === "UserSummaryItem");

            this.findReactionComponent().then(ReactionComponent => {
                this.reactionPatches.push(Patcher.after(ReactionComponent.prototype, "componentWillMount", thisObject => {
                    thisObject.setState({
                        ...thisObject.state,
                        isReactorsLoading: true
                    });
                }));

                this.reactionPatches.push(Patcher.after(ReactionComponent.prototype, "componentDidMount", thisObject => {
                    const { emoji, message } = thisObject.props;

                    ReactionManager.getReactions(message.channel_id, message.id, emoji).then(() => {
                        thisObject.setState({
                            ...thisObject.state,
                            isReactorsLoading: false
                        });
                    });
                }));

                this.reactionPatches.push(Patcher.after(ReactionComponent.prototype, "render", thisObject => {
                    const reactionNode = ReactDOM.findDOMNode(thisObject);
                    if (!reactionNode || thisObject.state.isReactorsLoading) return;

                    const { emoji, message } = thisObject.props;

                    const reactors = Object.values(ReactionStore.getReactions(message.channel_id, message.id, emoji));

                    ReactDOM.render(React.createElement(UserSummaryItem.default, {
                        max: 6,
                        users: reactors,
                        renderIcon: false,
                    }), this.getOrCreateReactorsWrapperNode(reactionNode));
                }));
            });
        }

        unpatchReaction() {
            for (const unpatch of this.reactionPatches) {
                unpatch();
            }
        }

        async findReactionComponent() {
            return new Promise(resolve => {
                const Reactions = WebpackModules.find(m => m.default?.displayName === "Reactions");

                const unpatch = Patcher.after(Reactions.default.prototype, "render", (thisObject, args, returnValue) => {
                    if (!returnValue) return;

                    const reaction = returnValue.props.children[0][0];
                    if (reaction) {
                        unpatch();
                        resolve(reaction.type);
                    }
                });
            });
        }

        getOrCreateReactorsWrapperNode(reactionNode) {
            let reactorsWrapperNode = reactionNode.querySelector(".reactors-wrapper");

            if (!reactorsWrapperNode) {
                const reactionInnerNode = reactionNode.querySelector(".da-reactionInner");

                reactorsWrapperNode = document.createElement("div");
                reactorsWrapperNode.className = "reactors-wrapper";

                reactionInnerNode.appendChild(reactorsWrapperNode);
            }

            return reactorsWrapperNode;
        }
    }

    return WhoReacted;
})(global.ZeresPluginLibrary.buildPlugin(config));
