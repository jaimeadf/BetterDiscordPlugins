import React, { useMemo } from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

const { UserStore, RelationshipStore } = DiscordModules;

const Flux = WebpackModules.getByProps('Store', 'connectStores');
const ReactionStore = WebpackModules.getByProps('getReactions', '_changeCallbacks');
const VoiceUserSummaryItem = WebpackModules.find(m => m?.default?.displayName === 'VoiceUserSummaryItem').default;

function Reactors({ users, currentUser, showSelf, showBots, showBlocked, max, size, count }) {
    const filteredUsers = useMemo(() => {
        return users.filter(
            user =>
                (showSelf || user.id !== currentUser.id) &&
                (showBots || !user.bot) &&
                (showBlocked || !RelationshipStore.isBlocked(user.id))
        );
    }, [users, currentUser, showSelf, showBots, showBlocked]);

    function renderMoreUsers(text, className) {
        return (
            <div className={`${className} more-reactors`}>
                +{1 + count - max - (users.length - filteredUsers.length)}
            </div>
        );
    }

    return (
        <VoiceUserSummaryItem
            className={`reactors reactors-size-${size}px`}
            max={max}
            users={filteredUsers}
            renderMoreUsers={renderMoreUsers}
        />
    );
}

export default Flux.connectStores([UserStore, ReactionStore], ({ message, emoji }) => ({
    currentUser: UserStore.getCurrentUser(),
    users: Object.values(ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {})
}))(Reactors);
