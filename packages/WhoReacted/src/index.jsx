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

            Patcher.after(reaction.type.prototype, 'render', (thisObject, _, result) => {
                const { message, emoji, count, type } = thisObject.props;
                const renderTooltip = result.props.children[0].props.children;

                result.props.children[0].props.children = tooltipProps => {
                    const tooltipChildren = renderTooltip(tooltipProps);
                    const renderPopout = tooltipChildren.props.children.props.children.props.children;

                    tooltipChildren.props.children.props.children.props.children = popoutProps => {
                        const popoutChildren = renderPopout(popoutProps);

                        popoutChildren.props.children.push(
                            <SmartReactors
                                message={message}
                                emoji={emoji}
                                count={count}
                                type={type}
                            />
                        );

                        return popoutChildren;
                    };
                    
                    return tooltipChildren;
                };
            });
        });
    }
}
