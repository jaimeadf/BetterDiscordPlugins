import React from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary';

const { UserStore } = DiscordModules;

const Flux = WebpackModules.getByProps('Store', 'connectStores');
const ReactionStore = WebpackModules.getByProps('getReactions', '_changeCallbacks');
const VoiceUserSummaryItem = WebpackModules.find(m => m?.default?.displayName === 'VoiceUserSummaryItem').default;

const Reactors = ({ count, max, currentUser, users, showSelf, showBot, size }) => {
    const filteredUsers = users.filter(user => (showSelf || user !== currentUser) && (showBot || user.bot !== true));
    const filtered = users.length - filteredUsers.length;

    function renderMoreUsers(text, className) {
        return (
            <div className={`${className} bd-who-reacted-more-reactors`}>
                +{1 + count - max - filtered}
            </div>
        );
    }

    return (
        <VoiceUserSummaryItem
            className={`bd-who-reacted-reactors bd-who-reacted-size-${size}px`}
            max={max}
            users={filteredUsers}
            renderMoreUsers={renderMoreUsers}
        />
    );
};

export default Flux.connectStores([UserStore, ReactionStore], ({ message, emoji }) => ({
    currentUser: UserStore.getCurrentUser(),
    users: Object.values(ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {})
}))(Reactors);
