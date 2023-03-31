import React, { useMemo } from 'react';

import { Reactor, MaskedReactor } from './Reactor';

import { BoundedBdApi } from '../environment';

import { useStateFromStores } from '../hooks/useStateFromStores';
import { useSettings } from '../stores/SettingsStore';

const { Webpack } = BoundedBdApi;
const { Filters } = Webpack;

const ReactionStore = Webpack.getModule(Filters.byProps('getReactions'));
const ChannelStore = Webpack.getModule(Filters.byProps('getChannel', 'hasChannel'));
const UserStore = Webpack.getModule(Filters.byProps('getUser', 'getCurrentUser'));
const RelationshipStore = Webpack.getModule(Filters.byProps('isBlocked'));

export function Reactors({ count, channel, users, max, size, overlap, spacing }) {
    const usersShown = Math.min(max, users.length);

    const hasMoreUsers = count > usersShown;
    const userSummary = users.slice(0, usersShown);

    if (userSummary.length == 0) {
        return null;
    }

    return (
        <div className="bd-who-reacted__reactors">
            {userSummary.map((user, index) => index == count - 1
                ? (
                    <Reactor
                        size={size}
                        user={user}
                        guildId={channel.guild_id}
                    />
                )
                : (
                    <MaskedReactor
                        size={size}
                        user={user}
                        guildId={channel.guild_id}
                        overlap={overlap}
                        spacing={spacing}
                    />
                )
            )}

            {hasMoreUsers && (
                <div
                    className="bd-who-reacted__more-reactors"
                    style={{
                        height: `${size}px`,
                        minWidth: `${size}px`,
                        padding: `0 ${size / 3}px`,
                        borderRadius: `${size / 2}px`,
                        fontSize: `${size / 2}px`
                    }}
                >
                    +{count - usersShown}
                </div>
            )}
        </div>
    );
}

export function SmartReactors({ message, emoji, count, type }) {
    const [settings] = useSettings();
    const ReactorsComponent = useMemo(() => {
        let component = Reactors;

        if (settings.hideSelf) {
            component = withSelfHidden(component);
        }

        if (settings.hideBots) {
            component = withBotsHidden(component);
        }

        if (settings.hideBlocked) {
            component = withBlockedHidden(component);
        }

        return withStoresConnected(component);
    }, [settings.hideSelf, settings.hideBots, settings.hideBlocked]);

    function shouldDisplayReactors() {
        return !isEmojiAboveThreshold() &&
            !isTotalReactionsAboveThreshold() &&
            !isReactionsPerEmojiAboveThreshold();
    }

    function isEmojiAboveThreshold() {
        if (isThresholdDisabled(settings.emojiThreshold)) {
            return false;
        }

        return message.reactions.length > settings.emojiThreshold;
    }

    function isTotalReactionsAboveThreshold() {
        if (isThresholdDisabled(settings.reactionsTotalThreshold)) {
            return false;
        }

        return message.reactions.reduce((sum, reaction) => sum + reaction.count, 0) > settings.reactionsTotalThreshold;
    }

    function isReactionsPerEmojiAboveThreshold() {
        if (!isThresholdDisabled(settings.reactionsPerEmojiThreshold)) {
            for (const reaction of message.reactions) {
                if (reaction.count > settings.reactionsPerEmojiThreshold) {
                    return true;
                }
            }
        }

        return false;
    }

    function isThresholdDisabled(threshold) {
        return threshold == 0;
    }

    if (!shouldDisplayReactors()) {
        return null;
    }

    return (
        <ReactorsComponent
            message={message}
            emoji={emoji}
            count={count}
            type={type}
            max={settings.max}
            size={settings.avatarSize}
            overlap={settings.avatarOverlap / 100}
            spacing={settings.avatarSpacing / 100}
        />
    );
}

export function withStoresConnected(ReactorsComponent) {
    return props => {
        const channel = useStateFromStores([ChannelStore], () => ChannelStore.getChannel(props.message.getChannelId()));
        const users = useStateFromStores(
            [ReactionStore],
            () => Object.values(ReactionStore.getReactions(
                props.message.getChannelId(),
                props.message.id,
                props.emoji,
                100,
                props.type
            ))
        );

        return (
            <ReactorsComponent {...props} channel={channel} users={users} />
        );
    };
}

export function withSelfHidden(ReactorsComponent) {
    return props => {
        const currentUser = useStateFromStores([UserStore], () => UserStore.getCurrentUser());
        const filteredUsers = props.users.filter(user => user.id != currentUser.id)

        return (
            <ReactorsComponent
                {...props}
                users={filteredUsers}
            />
        );
    };
}

export function withBotsHidden(ReactorsComponent) {
    return props => {
        const filteredUsers = props.users.filter(user => !user.bot);

        return (
            <ReactorsComponent
                {...props}
                users={filteredUsers}
            />
        );
    };
}

export function withBlockedHidden(ReactorsComponent) {
    return props => {
        const filteredUsers = useStateFromStores(
            [RelationshipStore],
            () => props.users.filter(user => !RelationshipStore.isBlocked(user.id))
        );

        return (
            <ReactorsComponent
                {...props}
                users={filteredUsers}
            />
        );
    };
}
