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
        version: "1.0.10",
        description: "Shows the avatars of the users who reacted to a message.",
        github: "https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/WhoReacted",
        github_raw: "https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/WhoReacted/WhoReacted.plugin.js",
        changelog: [
            {
                title: "Improvements",
                type: "improved",
                items: [
                    "More performance improvements."
                ]
            }
        ]
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
                amountOfReactionsToHideUsers: 10
            };
        }

        onStart() {
            PluginUtilities.addStyle(this.getName(), this.css);
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
                    "The maximum amount of users shown per reaction.",
                    this.settings.maxUsersShown,
                    value => {
                        if (isNaN(value) || value < 1 || value > 99) {
                            return Toasts.error("Value must be a number between 1 and 99!");
                        }

                        this.settings.maxUsersShown = parseInt(value);
                    }
                ),
                new Textbox(
                    "Amount of reactions to hide users",
                    "The minimum amount of reactions on a message to hide all the users. Set to 0 to never hide.",
                    this.settings.amountOfReactionsToHideUsers,
                    value => {
                        if (isNaN(value) || value < 0) {
                            return Toasts.error("Value must be a non-negative number!");
                        }

                        this.settings.amountOfReactionsToHideUsers = parseInt(value);
                    }
                )
            );
        }

        getSettingsPanel() {
            return this.buildSettingsPanel().getElement();
        }

        async patchReactions() {
            const VoiceUserSummaryItemComponent = WebpackModules.find(m => m.default?.displayName === "VoiceUserSummaryItem").default;

            const Reaction = await this.findReaction();
            const Reactions = await this.findReactions();

            const self = this;

            class ReactionWithReactorsComponent extends Reaction.component {
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
                }

                getReactors() {
                    const { message, emoji } = this.props;
                    return Object.values(ReactionStore.getReactions(message.channel_id, message.id, emoji));
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

            Patcher.after(Reactions.component.prototype, "render", (thisObject, args, returnValue) => {
                if (!returnValue) return;

                const { message } = thisObject.props;

                if (this.settings.amountOfReactionsToHideUsers === 0
                    || message.reactions.length <= this.settings.amountOfReactionsToHideUsers) {
                    returnValue.props.children[0] = returnValue.props.children[0].map(reactionElement => {
                        return React.createElement(ReactionWithReactorsComponent, {
                            ...reactionElement.props
                        });
                    });
                }
            });

            Reactions.forceUpdateAll();
        }

        async findReaction() {
            const Reactions = await this.findReactions();

            const unpatch = Patcher.after(Reactions.component.prototype, "render", (thisObject, args, returnValue) => {
                if (!returnValue) return;

                const reactionElement = returnValue.props.children[0][0];
                if (reactionElement) {
                    unpatch();
                    ReactComponents.push(reactionElement.type);
                }
            });

            Reactions.forceUpdateAll();

            return ReactComponents.getComponentByName("Reaction");
        }

        findReactions() {
            return ReactComponents.getComponentByName("Reactions", DiscordSelectors.Reactions.reactions);
        }
    }

    return WhoReacted;
})(global.ZeresPluginLibrary.buildPlugin(config));

/*@end@*/
