/*@license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import { DiscordModules } from '@zlibrary/api';

const { Flux, Dispatcher, MemberCountStore, DiscordConstants: { ActionTypes } } = DiscordModules;

const memberCounts = new Map();
const onlineMemberCounts = new Map();

function handleConnectionOpen({ guilds }) {
    for (const guild of guilds) {
        memberCounts.set(guild.id, guild.member_count);
    }
}

function handleGuildCreate({ guild }) {
    memberCounts.set(guild.id, guild.member_count);
}

function handleGuildDelete({ guild }) {
    memberCounts.delete(guild.id);
    onlineMemberCounts.delete(guild.id);
}

function handleGuildMemberListUpdate({ guildId, memberCount, groups }) {
    if (memberCount !== 0) {
        memberCounts.set(guildId, memberCount);
    }

    onlineMemberCounts.set(guildId, groups.reduce((total, group) => {
        return group.id !== 'offline' ? total + group.count : total;
    }, 0));
}

function handleOnlineMemberCountUpdate({ guildId, count }) {
    onlineMemberCounts.set(guildId, count);
}

class MemberCountsStore extends Flux.Store {
    constructor(dispatcher, handlers) {
        super(dispatcher, handlers);
    }

    getMemberCounts(guildId) {
        return {
            members: memberCounts.get(guildId) ?? MemberCountStore.getMemberCount(guildId),
            membersOnline: onlineMemberCounts.get(guildId)
        };
    }
}

export default new MemberCountsStore(Dispatcher, {
    [ActionTypes.CONNECTION_OPEN]: handleConnectionOpen,
    [ActionTypes.GUILD_CREATE]: handleGuildCreate,
    [ActionTypes.GUILD_DELETE]: handleGuildDelete,
    [ActionTypes.GUILD_MEMBER_LIST_UPDATE]: handleGuildMemberListUpdate,
    [ActionTypes.ONLINE_GUILD_MEMBER_COUNT_UPDATE]: handleOnlineMemberCountUpdate
});
