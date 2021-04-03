import React from 'react';
import { BdApi } from '@bandagedbd/bdapi';

const Flux = BdApi.findModuleByProps('Store', 'connectStores');
const ReactionStore = BdApi.findModuleByProps('getReactions', '_changeCallbacks');
const VoiceUserSummaryItem = BdApi.findModule(m => m?.default?.displayName === 'VoiceUserSummaryItem').default;

const Reactors = ({ count, max, users }) => {
    function renderMoreUsers(text, className) {
        return (
            <div className={`${className} bd-who-reacted-more-reactors`}>
                +{1 + count - max}
            </div>
        );
    }

    return (
        <VoiceUserSummaryItem
            className="bd-who-reacted-reactors"
            max={max}
            users={users}
            renderMoreUsers={renderMoreUsers}
        />
    );
};

export default Flux.connectStores([ReactionStore], ({ message, emoji }) => ({
    users: Object.values(ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {})
}))(Reactors);
