/**
 * @name WhoReacted
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/WhoReacted
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/blob/main/WhoReacted/WhoReacted.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/WhoReacted/WhoReacted.plugin.js
 */

/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/

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
        version: "1.1.0",
        description: "Shows the avatars of the users who reacted to a message.",
        github: "https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/WhoReacted",
        github_raw: "https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/WhoReacted/WhoReacted.plugin.js",
        changelog: [
            {
                title: "New Settings",
                items: [
                    "New setting to hide all the users when there is a specified count of reactions on a single emoji (Thanks @YeapGuy on GitHub)."
                ]
            }
        ]
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

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
    const {
        DiscordModules,
        Settings,
        WebpackModules,
        PluginUtilities,
        Patcher,
        Toasts,
        DiscordSelectors,
        ReactComponents
    } = Library;
    const { React, Dispatcher, DiscordConstants: { ActionTypes } } = DiscordModules;
    const { SettingPanel, Textbox } = Settings;

    const ReactionStore = WebpackModules.getByProps("getReactions", "_changeCallbacks");

    class WhoReacted extends Plugin {
        get css() {
            return `          
                .reactors:not(:empty) {
                    margin-left: 6px;
                }
            `;
        }

        constructor() {
            super();

            this.defaultSettings = {
                maxUsersShown: 6,
                countOfEmojisToHideUsers: 10,
                countOfReactionsOnEmojiToHideUsers: 50
            };
        }

        async onStart() {
            // Compatibility with older version
            if (this.settings.amountOfReactionsToHideUsers !== undefined) {
                this.settings.countOfEmojisToHideUsers = this.settings.amountOfReactionsToHideUsers;
                delete this.settings.amountOfReactionsToHideUsers;

                this.saveSettings();
            }

            PluginUtilities.addStyle(this.getName(), this.css);

            this.Reactions = await this.findReactions();
            this.Reaction = await this.findReaction();

            this.patchReactions();
        }

        onStop() {
            PluginUtilities.removeStyle(this.getName());
            Patcher.unpatchAll();
        }

        buildSettingsPanel() {
            return new SettingPanel(this.saveSettings.bind(this),
                new Textbox(
                    "Max users shown",
                    "The maximum count of users shown per emoji.",
                    this.settings.maxUsersShown,
                    value => {
                        if (isNaN(value) || value < 1 || value > 99) {
                            return Toasts.error("Value must be a number between 1 and 99!");
                        }

                        this.settings.maxUsersShown = parseInt(value);
                    }
                ),
                new Textbox(
                    "Count of emojis to hide users",
                    "The minimum count of separate emojis on a message to hide all the users. Set to 0 to disable.",
                    this.settings.countOfEmojisToHideUsers,
                    value => {
                        if (isNaN(value) || value < 0) {
                            return Toasts.error("Value must be a non-negative number!");
                        }

                        this.settings.countOfEmojisToHideUsers = parseInt(value);
                    }
                ),
                new Textbox(
                    "Count of reactions on emoji to hide users",
                    "The minimum count of reactions on a single emoji to hide all the users. Set to 0 to disable.",
                    this.settings.countOfReactionsOnEmojiToHideUsers,
                    value => {
                        if (isNaN(value) || value < 0) {
                            return Toasts.error("Value must be a non-negative number!");
                        }

                        this.settings.countOfReactionsOnEmojiToHideUsers = parseInt(value);
                    }
                )
            );
        }

        getSettingsPanel() {
            return this.buildSettingsPanel().getElement();
        }

        patchReactions() {
            const VoiceUserSummaryItemComponent = WebpackModules.find(m => m.default?.displayName === "VoiceUserSummaryItem").default;

            const self = this;

            class ReactionWithReactorsComponent extends this.Reaction.component {
                constructor(props) {
                    super(props);
                    this.state.reactors = this.getReactors();
                }

                refreshReactors = data => {
                    const { message } = this.props;
                    if (data.channelId !== message.channel_id || data.messageId !== message.id) return;

                    this.setState({
                        ...this.state,
                        reactors: this.getReactors()
                    });
                };

                componentDidMount() {
                    Dispatcher.subscribe(ActionTypes.MESSAGE_REACTION_ADD, this.refreshReactors);
                    Dispatcher.subscribe(ActionTypes.MESSAGE_REACTION_ADD_USERS, this.refreshReactors);
                    Dispatcher.subscribe(ActionTypes.MESSAGE_REACTION_REMOVE, this.refreshReactors);
                    Dispatcher.subscribe(ActionTypes.MESSAGE_REACTION_REMOVE_ALL, this.refreshReactors);
                }

                render() {
                    const element = super.render();
                    const tooltip = element.props.children;

                    element.props.children = props => {
                        const tooltipElement = tooltip(props);
                        const popoutElement = tooltipElement.props.children;

                        const reactionInner = popoutElement.props.children.props.children;

                        popoutElement.props.children.props.children = props => {
                            const reactionInnerElement = reactionInner(props);

                            reactionInnerElement.props.children.props.children.push(this.renderReactors());

                            return reactionInnerElement;
                        }

                        return tooltipElement;
                    };

                    return element;
                }

                componentWillUnmount() {
                    Dispatcher.unsubscribe(ActionTypes.MESSAGE_REACTION_ADD, this.refreshReactors);
                    Dispatcher.unsubscribe(ActionTypes.MESSAGE_REACTION_ADD_USERS, this.refreshReactors);
                    Dispatcher.unsubscribe(ActionTypes.MESSAGE_REACTION_REMOVE, this.refreshReactors);
                    Dispatcher.unsubscribe(ActionTypes.MESSAGE_REACTION_REMOVE_ALL, this.refreshReactors);
                }

                getReactors() {
                    const { message, emoji } = this.props;
                    return Object.values(ReactionStore.getReactions(message.channel_id, message.id, emoji) ?? {});
                }

                renderReactors() {
                    const { count } = this.props;
                    const { reactors } = this.state;

                    return React.createElement(VoiceUserSummaryItemComponent, {
                            className: "reactors",
                            max: self.settings.maxUsersShown,
                            users: reactors,
                            renderMoreUsers: (text, className) => {
                                return React.createElement("div", {
                                    className,
                                    style: {
                                        backgroundColor: "var(--background-tertiary)",
                                        color: "var(--text-normal)",
                                        fontWeight: 500
                                    }
                                }, `+${count - self.settings.maxUsersShown + 1}`);
                            }
                        }
                    );
                }
            }

            Patcher.after(this.Reactions.component.prototype, "render", (thisObject, args, returnValue) => {
                if (!returnValue) return;

                const { message } = thisObject.props;

                if (this.canShowReactors(message)) {
                    returnValue.props.children[0] = returnValue.props.children[0].map(reactionElement => {
                        return React.createElement(ReactionWithReactorsComponent, {
                            ...reactionElement.props
                        });
                    });
                }
            });

            this.Reactions.forceUpdateAll();
        }

        canShowReactors({ reactions }) {
            const { countOfEmojisToHideUsers, countOfReactionsOnEmojiToHideUsers } = this.settings;

            if (countOfEmojisToHideUsers !== 0 && reactions.length >= countOfEmojisToHideUsers)
                return false;

            const highestReactionCount = Math.max(...reactions.map(reaction => reaction.count));
            if (countOfReactionsOnEmojiToHideUsers !== 0 && highestReactionCount >= countOfReactionsOnEmojiToHideUsers)
                return false;

            return true;
        }

        findReactions() {
            return ReactComponents.getComponentByName("Reactions", DiscordSelectors.Reactions.reactions);
        }

        findReaction() {
            const unpatch = Patcher.after(this.Reactions.component.prototype, "render", (thisObject, args, returnValue) => {
                if (!returnValue) return;

                const reactionElement = returnValue.props.children[0][0];
                if (reactionElement) {
                    unpatch();
                    ReactComponents.push(reactionElement.type);
                }
            });

            this.Reactions.forceUpdateAll();

            return ReactComponents.getComponentByName("Reaction");
        }
    }

    return WhoReacted;
})(global.ZeresPluginLibrary.buildPlugin(config));

/*@end@*/
