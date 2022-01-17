/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';

import MemberCountsStore from '../../stores/MemberCountsStore';

import GuildBanner from './GuildBanner';
import GuildFeatures from './GuildFeatures';
import GuildTag from './GuildTag';

const InviteButton = WebpackModules.getModule(m => m.displayName === 'InviteButton' && m.Header);
const { default: Avatar } = WebpackModules.getByProps('AnimatedAvatar');

function MemberCounts({ guild }) {
    const { members, membersOnline } = useStateFromStores([MemberCountsStore], () =>
        MemberCountsStore.getMemberCounts(guild.id)
    );

    return (
        <div className="guildDetail-3EJhW_">
            <InviteButton.Data members={members} membersOnline={membersOnline} />
        </div>
    );
}

export default function GuildProfileModalHeader({ guild }) {
    return (
        <header>
            <GuildBanner guild={guild} />
            <div className="header-S26rhB">
                <Avatar className="avatar-3QF_VA" src={guild.getIconURL(256, true)} size={Avatar.Sizes.SIZE_120} />
                <div className="headerTop-1PNKck header-top">
                    {guild.features.size > 0 && <GuildFeatures className="badgeList-2aoHPw" guild={guild} />}
                    <MemberCounts guild={guild} />
                </div>
            </div>
            <GuildTag
                className="nameTagNoCustomStatus-3ocqoK nameTag-2Nlmsy"
                usernameClass="username-1g6Iq1"
                guild={guild}
            />
        </header>
    );
}
