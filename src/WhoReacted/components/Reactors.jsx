import React from 'react';
import { WebpackModules } from 'zlibrary';

const Flux = WebpackModules.getByProps('Store', 'connectStores');
const ReactionStore = WebpackModules.getByProps('getReactions', '_changeCallbacks');
const VoiceUserSummaryItem = WebpackModules.find(m => m?.default?.displayName === 'VoiceUserSummaryItem').default;

const Reactors = ({ count, max, users }) => {
    function renderMoreUsers(text, className) {
        return (
            <div className={`${className} more-reactors`}>
                +{1 + count - max}
            </div>
        );
    }

    return <VoiceUserSummaryItem
        className="who-reacted-reactors"
        max={max}
        users={users}
        renderMoreUsers={renderMoreUsers}
    />
};

export default Flux.connectStores([ReactionStore], ({ message, emoji }) => ({
    users: Object.values(ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {})
}))(Reactors);
