/*@license
 * Copyright (c) 2021 NurMarvin (Marvin Witt) & jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

const {
    Flux,
    RelationshipStore,
    GuildMemberStore,
    UserStore,
    GuildChannelsStore,
    i18n: { Messages },
    ModalStack,
    UserProfileModals,
    ContextMenuActions,
    ScrollerThin,
    Clickable,
    DiscordConstants: {
        RelationshipTypes
    }
} = DiscordModules;

const GuildChannelUserContextMenu = WebpackModules.getByDisplayName('GuildChannelUserContextMenu');

const { Avatar } = WebpackModules.getByProps('Avatar');
const DiscordTag = WebpackModules.getByDisplayName('DiscordTag');

const classes = {
    ...WebpackModules.getByProps('body', 'empty'),
    ...WebpackModules.getByProps('emptyIconFriends'),
    ...WebpackModules.getByProps('listRow')
};

const NoRelationshipsOfTypeMessages = {
    [RelationshipTypes.FRIEND]: 'NO_FRIENDS_IN_THIS_GUILD',
    [RelationshipTypes.BLOCKED]: 'NO_BLOCKED_USERS_IN_THIS_GUILD'
};

function Relationships({ guild, channel, users, relationshipType }) {
    function handleSelect(user) {
        ModalStack.pop();
        UserProfileModals.open(user.id);
    }

    function handleContextMenu(event, user) {
        ContextMenuActions.openContextMenu(event, () => (
            <GuildChannelUserContextMenu
                {...event}
                user={user}
                guildId={guild.id}
                channelId={channel?.id}
            />
        ));
    }

    if (users.length <= 0) {
        return (
            <div className={classes.empty}>
                <div className={classes.emptyIconFriends} />
                <div className={classes.emptyText}>
                    {Messages[NoRelationshipsOfTypeMessages[relationshipType]]}
                </div>
            </div>
        );
    }

    return (
        <ScrollerThin className={classes.listScroller} fade={true}>
            {users.map(user => (
                <Clickable
                    className={classes.listRow}
                    onClick={() => handleSelect(user)}
                    onSelect={() => handleSelect(user)}
                    onContextMenu={event => handleContextMenu(event, user)}
                >
                    <Avatar
                        className={classes.listAvatar}
                        src={user.avatarURL}
                        size={Avatar.Sizes.SIZE_40}
                    />
                    <DiscordTag
                        user={user}
                        className={classes.listName}
                        discriminatorClass={classes.listDiscriminator}
                    />
                </Clickable>
            ))}
        </ScrollerThin>
    );
}

export default Flux.connectStores(
    [RelationshipStore, GuildMemberStore, UserStore, GuildChannelsStore],
    ({ guild, relationshipType }) => {
        const users = [];
        const relationships = RelationshipStore.getRelationships();

        for (const userId in relationships) {
            if (relationships[userId] !== relationshipType || !GuildMemberStore.isMember(guild.id, userId)) {
                continue;
            }

            users.push(UserStore.getUser(userId));
        }

        return {
            users,
            channel: GuildChannelsStore.getDefaultChannel(guild.id)
        };
    }
)(Relationships);
