/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';

import { WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';
import i18n from '@discord/i18n';
import Text from '@discord/components/Text';
import Flex from '@discord/components/Flex';

import { ScrollerThin } from '@discord/components/Scroller';

const StreamerModeStore = WebpackModules.getByProps('hidePersonalInformation');

const classes = {
    roleHeight: WebpackModules.getByProps('height8'),
    roleWidth: WebpackModules.getByProps('width8'),
    margins: WebpackModules.getByProps('marginBottom8'),
    list: WebpackModules.getByProps('empty', 'emptyIconStreamerMode', 'emptyText'),
    infoSection: WebpackModules.getByProps('infoScroller'),
    row: WebpackModules.getByProps('listRow')
};

function RoleSection({ key, role }) {
    return (
        <Flex align={Flex.Align.Center} key={key} className={classes.row.listRow}>
            <div
                className={[classes.roleHeight, classes.roleWidth]}
                style={{ backgroundColor: role.colorString }}
            ></div>{' '}
            <Text selectable={false}>{role.name}</Text>
        </Flex>
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
            {roles.map(r => {
                return <RoleSection key={r.id} role={r}></RoleSection>;
            })}
        </ScrollerThin>
    );
}
