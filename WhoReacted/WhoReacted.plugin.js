/**
 * @name WhoReacted
 * @version 1.2.0
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
        version: "1.2.0",
        description: "Shows the avatars of the users who reacted to a message.",
        github: "https://github.com/jaimeadf/BetterDiscordPlugins/tree/main/WhoReacted",
        github_raw: "https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/WhoReacted/WhoReacted.plugin.js"
    },
    changelog: [
        {
            title: "More features",
            items: [
                "Added a new setting that lets you choose if you want to use the reaction with most reactors or the sum of reactors for the user threshold.",
                "Added auto updating when any setting is changed."
            ]
        },
        {
            title: "Improvements",
            type: "improved",
            items: [
                "Various optimizations and performance fixes for a much smoother experience.",
                "Renamed settings and rewritten their descriptions."
            ]
        },
        {
            title: "Finally fixed",
            type: "fixed",
            items: [
                "The changelog now shows (yay)."
            ]
        }
    ]
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
                        if (error) {
                            return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        }

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
        ReactTools,
        Utilities
    } = Library;
    const { React } = DiscordModules;
    const { SettingPanel, Textbox, Slider, Switch } = Settings;

    const Flux = WebpackModules.getByProps("Store", "connectStores");
    const ReactionStore = WebpackModules.getByProps("getReactions", "_changeCallbacks");

    const Reactions = WebpackModules.find(m => m?.default?.displayName === "Reactions").default;
    const VoiceUserSummaryItem = WebpackModules.find(m => m?.default?.displayName === "VoiceUserSummaryItem").default;

    function Reactors({ count, max, users }) {
        function renderMoreUsers(text, className) {
            return React.createElement("div", {
                className: `${className} more-reactors`,
                children: `+${1 + count - max}`
            });
        }

        return React.createElement(VoiceUserSummaryItem, {
            className: "who-reacted-reactors",
            max,
            users,
            renderMoreUsers
        });
    }

    Reactors = Flux.connectStores([ReactionStore], ({ message, emoji }) => ({
        users: Object.values(ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {})
    }))(Reactors);

    class WhoReacted extends Plugin {
        get css() {
            return `          
                .who-reacted-reactors:not(:empty) {
                    margin-left: 6px;
                }
                
                .who-reacted-reactors .more-reactors {
                    background-color: var(--background-tertiary);
                    color: var(--text-normal);
                    font-weight: 500;
                }
            `;
        }

        constructor() {
            super();

            this.defaultSettings = {
                maxUsersShown: 6,
                reactionThreshold: 10,
                userThreshold: 100,
                useHighestUserCount: true
            };
        }

        async onStart() {
            PluginUtilities.addStyle(this.getName(), this.css);
            await this.patchReaction();
        }

        onStop() {
            PluginUtilities.removeStyle(this.getName());
            Patcher.unpatchAll();
        }

        loadSettings(defaultSettings) {
            const settings = super.loadSettings(defaultSettings);

            settings.reactionThreshold = settings.countOfEmojisToHideUsers ?? settings.reactionThreshold;
            settings.userThreshold = settings.countOfReactionsOnEmojiToHideUsers ?? settings.userThreshold;

            delete settings.countOfEmojisToHideUsers;
            delete settings.countOfReactionsOnEmojiToHideUsers;

            return settings;
        }

        buildSettingsPanel() {
            return new SettingPanel(
                () => {
                    this.saveSettings();
                    this.forceUpdateAllReactions();
                },
                new Textbox(
                    "Max users shown",
                    "The maximum number of users shown for each reaction emoji.",
                    this.settings.maxUsersShown,
                    value => {
                        if (isNaN(value) || value < 1 || value > 99) {
                            return Toasts.error("Value must be a number between 1 and 99!");
                        }

                        this.settings.maxUsersShown = parseInt(value);
                    }
                ),
                new Slider(
                    "Reaction threshold",
                    "Hides the reactors when the number of separate reactions is exceeded on a message. Set to 0 to disable.",
                    0,
                    20,
                    this.settings.reactionThreshold,
                    value => this.settings.reactionThreshold = value,
                    {
                        markers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                        stickToMarkers: true
                    }
                ),
                new Slider(
                    "User threshold",
                    "Hides the reactors when their count is exceeded on a message. Set to 0 to disable.",
                    0,
                    10000,
                    this.settings.userThreshold,
                    value => this.settings.userThreshold = value,
                    {
                        markers: [0, 10, 20, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 10000],
                        stickToMarkers: true,
                        equidistant: true
                    }
                ),
                new Switch(
                    "Use highest user count",
                    "Uses the reaction with most reactors of a message for user threshold.",
                    this.settings.useHighestUserCount,
                    value => this.settings.useHighestUserCount = value
                )
            );
        }

        getSettingsPanel() {
            return this.buildSettingsPanel().getElement();
        }

        async patchReaction() {
            const Reaction = await this.findReaction();

            const canShowReactors = ({ reactions }) => {
                const { reactionThreshold, userThreshold, useHighestUserCount } = this.settings;

                if (reactionThreshold !== 0 && reactions.length > reactionThreshold) {
                    return false;
                }

                if (userThreshold !== 0) {
                    const userCount = useHighestUserCount ?
                        Math.max(...reactions.map(reaction => reaction.count)) :
                        reactions.reduce((total, reaction) => total + reaction.count, 0);

                    if (userCount > userThreshold) {
                        return false;
                    }
                }

                return true;
            }

            Patcher.after(Reaction.prototype, "render", (thisObject, args, returnValue) => {
                const { message, emoji, count } = thisObject.props;
                if (!canShowReactors(message)) return;

                const renderTooltip = returnValue.props.children;
                returnValue.props.children = props => {
                    const tooltip = renderTooltip(props);
                    const popout = tooltip.props.children.props.children;

                    const renderReactionInner = popout.props.children;
                    popout.props.children = props => {
                        const reactionInner = renderReactionInner(props);

                        reactionInner.props.children.props.children.push(React.createElement(Reactors, {
                            message,
                            emoji,
                            count,
                            max: this.settings.maxUsersShown
                        }));

                        return reactionInner;
                    }

                    return tooltip;
                }
            });

            this.forceUpdateAllReactions();
        }

        findReaction() {
            return new Promise(resolve => {
                const node = document.querySelector(DiscordSelectors.Reactions.reaction);
                if (node) {
                    return resolve(this.findReactionReactInstance(node).type);
                }

                const unpatch = Patcher.after(Reactions.prototype, "render", (thisObject, args, returnValue) => {
                    if (!returnValue) return;

                    const reaction = returnValue.props.children[0][0];
                    if (reaction) {
                        unpatch();
                        resolve(reaction.type);
                    }
                });
            });
        }

        forceUpdateAllReactions() {
            for (const node of document.querySelectorAll(DiscordSelectors.Reactions.reaction)) {
                this.findReactionReactInstance(node).stateNode.forceUpdate();
            }
        }

        findReactionReactInstance(node) {
            return Utilities.findInTree(ReactTools.getReactInstance(node), r => r?.type?.displayName === "Reaction", {
                walkable: ["return"]
            });
        }
    }

    return WhoReacted;
})(global.ZeresPluginLibrary.buildPlugin(config));

/*@end@*/
