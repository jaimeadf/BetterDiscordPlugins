/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';

import MemberCountsStore from '../../stores/MemberCountsStore';

import GuildBanner from './GuildBanner';
import GuildFeatures from './GuildFeatures';
import GuildTag from './GuildTag';

const { ContextMenuActions, ImageResolver } = DiscordModules;

const InviteButton = WebpackModules.getByDisplayName('InviteButton');
const { default: Avatar } = WebpackModules.getByProps('AnimatedAvatar');
const NativeImageContextMenu = WebpackModules.getByDisplayName('NativeImageContextMenu');

const classes = {
    profileHeader: WebpackModules.getByProps(
        'header',
        'avatar',
        'headerTop',
        'badgeList',
        'nameTagNoCustomStatus',
        'username'
    ),
    invite: WebpackModules.getByProps('guildDetail')
};

function MemberCounts({ guild }) {
    const { members, membersOnline } = useStateFromStores([MemberCountsStore], () =>
        MemberCountsStore.getMemberCounts(guild.id)
    );

    return (
        <div className={classes.invite.guildDetail}>
            <InviteButton.Data members={members} membersOnline={membersOnline} />
        </div>
    );
}

export default function GuildProfileModalHeader({ guild }) {
    const fullSizeIconURL = ImageResolver.getGuildIconURL({
        id: guild.id,
        icon: guild.icon,
        size: 1024,
        canAnimate: true
    });

    function handleIconContextMenu(event) {
        ContextMenuActions.openContextMenu(event, () => <NativeImageContextMenu {...event} src={fullSizeIconURL} />);
    }

    return (
        <header>
            <GuildBanner guild={guild} />
            <div className={classes.profileHeader.header}>
                <Avatar
                    className={classes.profileHeader.avatar}
                    src={guild.getIconURL(true)}
                    size={Avatar.Sizes.SIZE_120}
                    onContextMenu={handleIconContextMenu}
                />
                <div className={`${classes.profileHeader.headerTop} header-top`}>
                    {guild.features.size > 0 && (
                        <GuildFeatures className={classes.profileHeader.badgeList} guild={guild} />
                    )}
                    <MemberCounts guild={guild} />
                </div>
                <GuildTag
                    className={classes.profileHeader.nameTagNoCustomStatus}
                    usernameClass={classes.profileHeader.username}
                    guild={guild}
                />
            </div>
        </header>
    );
}
