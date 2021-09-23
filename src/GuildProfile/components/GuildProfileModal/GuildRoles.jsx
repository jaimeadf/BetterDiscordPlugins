/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';

import { WebpackModules, DiscordModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';
import i18n from '@discord/i18n';
import Text from '@discord/components/Text';
import Flex from '@discord/components/Flex';

import { ScrollerThin } from '@discord/components/Scroller';

const {
    DiscordConstants: { HEXColors: Colors }
} = DiscordModules;

const StreamerModeStore = WebpackModules.getByProps('hidePersonalInformation');

const classes = {
    margins: WebpackModules.getByProps('marginBottom8'),
    list: WebpackModules.getByProps('empty', 'emptyIconStreamerMode', 'emptyText'),
    infoSection: WebpackModules.getByProps('infoScroller'),
    row: WebpackModules.getByProps('listRow'),
    roleTag: WebpackModules.getByProps('roleTag'),
    role: WebpackModules.getByProps('role')
};
const baseRoleColor = Colors.PRIMARY_DARK_300;

function RoleSection({ key, role }) {
    return (
        <div key={key} className={`${classes.role.flex} ${classes.roleTag.roleTag} ${classes.margins.marginBottom8}`}>
            <div
                className={`${classes.roleTag.roleDot}`}
                style={{
                    backgroundColor: role.colorString || baseRoleColor,
                    marginRight: 8
                }}
            ></div>
            <Text selectable={false}>{role.name}</Text>
        </div>
    );
}
export default function GuildRoles({ guild }) {
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hide);
    const roles = Object.values(guild.roles)?.sort((b, a) => a.position - b.position);
    if (hide || roles.length === 0)
        return (
            <div className={classes.list.empty}>
                <div className={classes.list.emptyIconStreamerMode} />
                <div className={classes.list.emptyText}>{i18n.Messages.STREAMER_MODE_ENABLED}</div>
            </div>
        );
    return (
        <ScrollerThin className={`${classes.infoSection.infoScroller} guild-roles`} fade={true}>
            <Flex justify={Flex.Justify.START} wrap={Flex.Wrap.WRAP}>
                {roles.map(role => {
                    return <RoleSection key={role.id} role={role}></RoleSection>;
                })}
            </Flex>
        </ScrollerThin>
    );
}
