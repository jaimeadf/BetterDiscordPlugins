import React, { useMemo } from 'react';
import { DiscordModules } from '@zlibrary/api';

const { Webpack } = BdApi;
const { byProps } = Webpack.Filters;

const { UserStore, RelationshipStore } = DiscordModules;

const Flux = Webpack.getModule(byProps('Store', 'connectStores'));
const ReactionStore = Webpack.getModule(byProps('getReactions', '_changeCallbacks'));
const VoiceUserSummaryItem = Webpack.getModule(byProps('renderUsers', 'renderMoreUsers'));

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
