/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';
import i18n from '@discord/i18n';

import { ScrollerThin } from '@discord/components/Scroller';
import Clickable from '@discord/components/Clickable';

const {
    RelationshipStore,
    GuildMemberStore,
    UserStore,
    GuildChannelsStore,
    ModalStack,
    UserProfileModals,
    ContextMenuActions,
    DiscordConstants: { RelationshipTypes }
} = DiscordModules;

const GuildChannelUserContextMenu = WebpackModules.getByDisplayName('GuildChannelUserContextMenu');

const { default: Avatar } = WebpackModules.getByProps('AnimatedAvatar');
const DiscordTag = WebpackModules.getByDisplayName('DiscordTag');

const classes = WebpackModules.getByProps('listRow');

const NoRelationshipsOfTypeMessages = {
    [RelationshipTypes.FRIEND]: 'GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD',
    [RelationshipTypes.BLOCKED]: 'GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD'
};

export default function Relationships({ guild, relationshipType }) {
    const channel = useStateFromStores([GuildChannelsStore], () => GuildChannelsStore.getDefaultChannel(guild.id));
    const users = useStateFromStores([RelationshipStore, GuildMemberStore, UserStore], () => {
        const users = [];
        const relationships = RelationshipStore.getRelationships();

        for (const userId in relationships) {
            if (relationships[userId] !== relationshipType || !GuildMemberStore.isMember(guild.id, userId)) {
                continue;
            }

            users.push(UserStore.getUser(userId));
        }

        return users;
    });

    function handleSelect(user) {
        ModalStack.pop();
        UserProfileModals.open(user.id);
    }

    function handleContextMenu(event, user) {
        ContextMenuActions.openContextMenu(event, () => (
            <GuildChannelUserContextMenu {...event} user={user} guildId={guild.id} channelId={channel?.id} />
        ));
    }

    if (users.length <= 0) {
        return (
            <div className={classes.empty}>
                <div className={classes.emptyIconFriends} />
                <div className={classes.emptyText}>
                    {i18n.Messages[NoRelationshipsOfTypeMessages[relationshipType]]}
                </div>
            </div>
        );
    }

    return (
        <ScrollerThin className={classes.listScroller} fade={true}>
            {users.map(user => (
                <Clickable
                    key={user.id}
                    className={classes.listRow}
                    onClick={() => handleSelect(user)}
                    onSelect={() => handleSelect(user)}
                    onContextMenu={event => handleContextMenu(event, user)}
                >
                    <Avatar className={classes.listAvatar} src={user.getAvatarURL()} size={Avatar.Sizes.SIZE_40} />
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
