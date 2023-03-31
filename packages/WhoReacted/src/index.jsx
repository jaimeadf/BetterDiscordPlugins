import React from 'react';

import { BoundedBdApi } from './environment';

import { SmartReactors } from './components/Reactors'
import { SettingsPanel } from './components/SettingsPanel';

import styles from './styles.scss';
import { SettingsStore } from './stores/SettingsStore';

const { Webpack, Patcher } = BoundedBdApi;

const ConnectedReaction = Webpack.getModule(m => m?.type?.toString()?.includes('burstReactionsEnabled'), { searchExports: true });

export default class WhoReacted {
    constructor() {
        SettingsStore.initializeIfNeeded();
        SettingsStore.load();
    }

    start() {
        BoundedBdApi.DOM.addStyle(styles);
        this.patchReaction();
    }

    stop() {
        BoundedBdApi.DOM.removeStyle();
        Patcher.unpatchAll();
    }

    getSettingsPanel() {
        return <SettingsPanel />;
    }

    patchReaction() {
        const unpatchConnectedReaction = Patcher.after(ConnectedReaction, 'type', (_, __, reaction) => {
            unpatchConnectedReaction();

            Patcher.after(reaction.type.prototype, 'render', (thisObject, _, tooltip) => {
                const { message, emoji, count, type } = thisObject.props;
                const renderTooltipChildren = tooltip.props.children;

                tooltip.props.children = reactionProps => {
                    const tooltipChildren = renderTooltipChildren(reactionProps);
                    const renderReactionInner = tooltipChildren.props.children.props.children.props.children;

                    tooltipChildren.props.children.props.children.props.children = reactionInnerProps => {
                        const reactionInner = renderReactionInner(reactionInnerProps);

                        reactionInner.props.children.push(
                            <SmartReactors
                                message={message}
                                emoji={emoji}
                                count={count}
                                type={type}
                            />
                        );

                        return reactionInner;
                    };

                    return tooltipChildren;
                };
            });
        });
    }
}
