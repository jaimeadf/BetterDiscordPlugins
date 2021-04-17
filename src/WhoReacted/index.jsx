import React from 'react';

import {
    WebpackModules,
    Settings,
    PluginUtilities,
    Toasts,
    Patcher,
    DiscordSelectors,
    Utilities,
    ReactTools
} from '@zlibrary/api';
import Plugin from '@zlibrary/plugin';

import Reactors from './components/Reactors';
import style from './style.scss';

const Reactions = WebpackModules.find(m => m?.default?.displayName === 'Reactions').default;
const { SettingPanel, SettingGroup, Textbox, Slider, Switch } = Settings;

export default class WhoReacted extends Plugin {
    constructor() {
        super();

        this.defaultSettings = {
            maxUsersShown: 6,
            avatarSize: 20,
            reactionThreshold: 10,
            userThreshold: 100,
            useHighestUserCount: true,
            showSelf: true,
            showBots: true
        };
    }

    async onStart() {
        PluginUtilities.addStyle(this.getName(), style);
        await this.patchReaction();
    }

    onStop() {
        PluginUtilities.removeStyle(this.getName());
        Patcher.unpatchAll();
    }

    buildSettingsPanel() {
        return new SettingPanel(
            () => {
                this.saveSettings();
                this.forceUpdateAllReactions();
            },
            this.buildDisplaySettingsGroup(),
            this.buildThresholdSettingsGroup(),
            this.buildFilterSettingsGroup()
        );
    }

    buildDisplaySettingsGroup() {
        return new SettingGroup('Display settings')
            .append(new Textbox(
                'Max users shown',
                'The maximum number of users shown for each reaction emoji.',
                this.settings.maxUsersShown,
                value => {
                    if (Number.isNaN(value) || value < 1 || value > 99) {
                        return Toasts.error('Value must be a number between 1 and 99!');
                    }

                    this.settings.maxUsersShown = parseInt(value);
                }
            ))
            .append(new Slider(
                'Avatar size',
                'Sets the size of the user avatars.',
                8,
                32,
                this.settings.avatarSize,
                value => {
                    this.settings.avatarSize = value;
                },
                {
                    defaultValue: this.defaultSettings.avatarSize,
                    markers: [8, 12, 16, 20, 24, 32],
                    stickToMarkers: true,
                    units: 'px'
                }
            ));
    }

    buildThresholdSettingsGroup() {
        function renderMarker(value) {
            if (value === 0) {
                return 'Off';
            }

            if (value >= 1000) {
                return `${value / 1000}k`;
            }

            return value;
        }

        return new SettingGroup('Thresholds')
            .append(new Slider(
                'Reaction threshold',
                'Hides the reactors when the number of separate reactions is exceeded on a message.',
                0,
                20,
                this.settings.reactionThreshold,
                value => {
                    this.settings.reactionThreshold = value;
                },
                {
                    defaultValue: this.defaultSettings.reactionThreshold,
                    markers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    stickToMarkers: true,
                    renderMarker
                }
            ))
            .append(new Slider(
                'User threshold',
                'Hides the reactors when their count is exceeded on a message.',
                0,
                10000,
                this.settings.userThreshold,
                value => {
                    this.settings.userThreshold = value;
                },
                {
                    defaultValue: this.defaultSettings.userThreshold,
                    markers: [0, 10, 20, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 10000],
                    stickToMarkers: true,
                    equidistant: true,
                    renderMarker
                }
            ))
            .append(new Switch(
                'Use highest user count',
                'Uses the reaction with most reactors of a message for user threshold.',
                this.settings.useHighestUserCount,
                value => {
                    this.settings.useHighestUserCount = value;
                }
            ));
    }

    buildFilterSettingsGroup() {
        return new SettingGroup('Filters')
            .append(new Switch(
                'Show self',
                'Shows yourself within the reactors.',
                this.settings.showSelf,
                value => {
                    this.settings.showSelf = value;
                }
            ))
            .append(new Switch(
                'Show bots',
                'Shows bots within the reactors.',
                this.settings.showBots,
                value => {
                    this.settings.showBots = value;
                }
            ));
    }

    getSettingsPanel() {
        return this.buildSettingsPanel().getElement();
    }

    async patchReaction() {
        const Reaction = await this.findReaction();

        Patcher.after(Reaction.prototype, 'render', (thisObject, args, returnValue) => {
            const { message, emoji, count } = thisObject.props;
            if (!this.canShowReactors(message)) return;

            const renderTooltip = returnValue.props.children;
            returnValue.props.children = tooltipProps => {
                const tooltip = renderTooltip(tooltipProps);
                const popout = tooltip.props.children.props.children;

                const renderReactionInner = popout.props.children;
                popout.props.children = popoutProps => {
                    const reactionInner = renderReactionInner(popoutProps);

                    reactionInner.props.children.props.children.push(
                        <Reactors
                            message={message}
                            emoji={emoji}
                            count={count}
                            max={this.settings.maxUsersShown}
                            showSelf={this.settings.showSelf}
                            showBots={this.settings.showBots}
                            size={this.settings.avatarSize}
                        />
                    );

                    return reactionInner;
                };

                return tooltip;
            };
        });

        this.forceUpdateAllReactions();
    }

    canShowReactors({ reactions }) {
        const { reactionThreshold, userThreshold, useHighestUserCount } = this.settings;

        if (reactionThreshold !== 0 && reactions.length > reactionThreshold) {
            return false;
        }

        if (userThreshold !== 0) {
            const userCount = useHighestUserCount
                ? Math.max(...reactions.map(reaction => reaction.count))
                : reactions.reduce((total, reaction) => total + reaction.count, 0);

            if (userCount > userThreshold) {
                return false;
            }
        }

        return true;
    }

    findReaction() {
        return new Promise(resolve => {
            const node = document.querySelector(DiscordSelectors.Reactions.reaction);
            if (node) {
                return resolve(this.findReactionReactInstance(node).type);
            }

            const unpatch = Patcher.after(Reactions.prototype, 'render', (thisObject, args, returnValue) => {
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
        return Utilities.findInTree(ReactTools.getReactInstance(node), r => r?.type?.displayName === 'Reaction', {
            walkable: ['return']
        });
    }
}
