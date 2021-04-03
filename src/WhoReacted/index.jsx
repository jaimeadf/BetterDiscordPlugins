import React from 'react';

import Reactors from './components/Reactors';
import style from './style.scss';

export default ([Plugin, Library]) => {
    const {
        Settings,
        WebpackModules,
        PluginUtilities,
        Patcher,
        Toasts,
        DiscordSelectors,
        ReactTools,
        Utilities
    } = Library;
    const { SettingPanel, Textbox, Slider, Switch } = Settings;

    const Reactions = WebpackModules.find(m => m?.default?.displayName === 'Reactions').default;

    class WhoReacted extends Plugin {
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
                new Textbox(
                    'Max users shown',
                    'The maximum number of users shown for each reaction emoji.',
                    this.settings.maxUsersShown,
                    value => {
                        if (isNaN(value) || value < 1 || value > 99) {
                            return Toasts.error('Value must be a number between 1 and 99!');
                        }

                        this.settings.maxUsersShown = parseInt(value);
                    }
                ),
                new Slider(
                    'Reaction threshold',
                    'Hides the reactors when the number of separate reactions is exceeded on a message. Set to 0 to disable.',
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
                    'User threshold',
                    'Hides the reactors when their count is exceeded on a message. Set to 0 to disable.',
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
                    'Use highest user count',
                    'Uses the reaction with most reactors of a message for user threshold.',
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
                    const userCount = useHighestUserCount
                        ? Math.max(...reactions.map(reaction => reaction.count))
                        : reactions.reduce((total, reaction) => total + reaction.count, 0);

                    if (userCount > userThreshold) {
                        return false;
                    }
                }

                return true;
            }

            Patcher.after(Reaction.prototype, 'render', (thisObject, args, returnValue) => {
                const { message, emoji, count } = thisObject.props;
                if (!canShowReactors(message)) return;

                const renderTooltip = returnValue.props.children;
                returnValue.props.children = props => {
                    const tooltip = renderTooltip(props);
                    const popout = tooltip.props.children.props.children;

                    const renderReactionInner = popout.props.children;
                    popout.props.children = props => {
                        const reactionInner = renderReactionInner(props);

                        reactionInner.props.children.props.children.push(
                            <Reactors
                                message={message}
                                emoji={emoji}
                                count={count}
                                max={this.settings.maxUsersShown}
                            />
                        );

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

    return WhoReacted;
};