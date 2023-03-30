import React from 'react';

import { Reactor, MaskedReactor } from './Reactor';
import { useStateFromStores } from '../hooks/useStateFromStores';

const { Webpack } = BdApi;
const { Filters } = Webpack;

const ReactionStore = Webpack.getModule(Filters.byProps('getReactions'));
const ChannelStore = Webpack.getModule(Filters.byProps('getChannel', 'hasChannel'));

export function Reactors({ count, channel, users, max, size, overlap, spacing }) {
    const hasMoreUsers = count > max;
    const userSummary = users.slice(0, max);

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
                    +{count - max}
                </div>
            )}
        </div>
    );
}

export function ConnectedReactors({ ReactorsComponent, ...props }) {
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
}
