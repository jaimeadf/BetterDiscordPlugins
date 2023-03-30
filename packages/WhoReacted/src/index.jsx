import React from 'react';

import { Reactors, ConnectedReactors } from './components/Reactors'
import { withSelfHidden, withBotsHidden, withBlockedHidden } from './filters';

import styles from './styles.scss';

const BoundedBdApi = new BdApi('WhoReacted');
const { Webpack, Patcher } = BoundedBdApi;

const ConnectedReaction = Webpack.getModule(m => m?.type?.toString()?.includes('burstReactionsEnabled'), { searchExports: true });

export default class WhoReacted {
    constructor() {
        this.ReactorsComponent = Reactors;
        this.settings = {
            max: 6,
            avatarSize: 24,
            avatarOverlap: 1 / 3,
            avatarSpacing: 1 / 12,
            emojiThreshold: 10,
            reactionsTotalThreshold: 100,
            reactionsPerEmojiThreshold: 100,
            hideSelf: false,
            hideBots: false,
            hideBlocked: false
        };

        if (this.settings.hideSelf) {
            this.ReactorsComponent = withSelfHidden(this.ReactorsComponent);
        }

        if (this.settings.hideBots) {
            this.ReactorsComponent = withBotsHidden(this.ReactorsComponent);
        }

        if (this.settings.hideBlocked) {
            this.ReactorsComponent = withBlockedHidden(this.ReactorsComponent);
        }
    }

    start() {
        BoundedBdApi.DOM.addStyle(styles);
        this.patchReaction();
    }

    stop() {
        BoundedBdApi.DOM.removeStyle();
        Patcher.unpatchAll();
    }

    patchReaction() {
        const unpatchConnectedReaction = Patcher.after(ConnectedReaction, 'type', (_, __, reaction) => {
            unpatchConnectedReaction();

            Patcher.after(reaction.type.prototype, 'render', (thisObject, _, tooltip) => {
                const { message, emoji, count, type } = thisObject.props;

                if (!this.shouldShowReactors(message)) {
                    return;
                }

                const renderTooltipChildren = tooltip.props.children;

                tooltip.props.children = reactionProps => {
                    const tooltipChildren = renderTooltipChildren(reactionProps);
                    const renderReactionInner = tooltipChildren.props.children.props.children.props.children;

                    tooltipChildren.props.children.props.children.props.children = reactionInnerProps => {
                        const reactionInner = renderReactionInner(reactionInnerProps);

                        reactionInner.props.children.push(
                            <ConnectedReactors
                                ReactorsComponent={this.ReactorsComponent}
                                message={message}
                                emoji={emoji}
                                count={count}
                                type={type}
                                max={this.settings.max}
                                size={this.settings.avatarSize}
                                overlap={this.settings.avatarOverlap}
                                spacing={this.settings.avatarSpacing}
                            />
                        );

                        return reactionInner;
                    };

                    return tooltipChildren;
                };
            });
        });
    }

    shouldShowReactors(message) {
        return!this.isEmojiAboveThreshold(message) &&
            !this.isTotalReactionsAboveThreshold(message) &&
            !this.isReactionsPerEmojiAboveThreshold(message);
    }

    isEmojiAboveThreshold(message) {
        return message.reactions.length > this.settings.emojiThreshold;
    }

    isTotalReactionsAboveThreshold(message) {
        return message.reactions.reduce((sum, reaction) => sum + reaction.count, 0) > this.settings.reactionsTotalThreshold;
    }

    isReactionsPerEmojiAboveThreshold(message) {
        for (const reaction of message.reactions) {
            if (reaction.count > this.settings.reactionsPerEmojiThreshold) {
                return true;
            }
        }

        return false;
    }
}
