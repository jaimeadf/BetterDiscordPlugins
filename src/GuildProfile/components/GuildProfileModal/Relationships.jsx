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
    DiscordConstants: { RelationshipTypes }
} = DiscordModules;

const { default: Avatar } = WebpackModules.getByProps('AnimatedAvatar');
const DiscordTag = WebpackModules.getByDisplayName('DiscordTag');

const UserProfileModalActions = WebpackModules.getByProps('openUserProfileModal');

const NoRelationshipsOfTypeMessages = {
    [RelationshipTypes.FRIEND]: 'GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD',
    [RelationshipTypes.BLOCKED]: 'GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD'
};

export default function Relationships({ guild, relationshipType }) {
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
        UserProfileModalActions.openUserProfileModal({ userId: user.id, guildId: guild.id });
    }

    return (
        <ScrollerThin className="listScroller-entkMk" fade={true}>
            {users.length <= 0 ? (
                <div className="empty-2zcusz">
                    <div className="emptyIconFriends-2LNxTX emptyIcon-uKVxYR" />
                    <div className="emptyText-mZZyQk">
                        {i18n.Messages[NoRelationshipsOfTypeMessages[relationshipType]]}
                    </div>
                </div>
            ) : (
                users.map(user => (
                    <Clickable
                        key={user.id}
                        className="listRow-2nO1T6"
                        onClick={() => handleSelect(user)}
                        onSelect={() => handleSelect(user)}
                    >
                        <Avatar className="listAvatar-2bU5Uh" src={user.getAvatarURL()} size={Avatar.Sizes.SIZE_40} />
                        <DiscordTag
                            user={user}
                            className="listName-PwbeHL"
                            discriminatorClass="listDiscriminator-1HAKWY"
                        />
                    </Clickable>
                ))
            )}
        </ScrollerThin>
    );
}
