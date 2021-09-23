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
import { ScrollerThin } from '@discord/components/Scroller';

const {
    DiscordConstants: { HEXColors }
} = DiscordModules;

const StreamerModeStore = WebpackModules.getByProps('hidePersonalInformation');

const classes = {
    margins: WebpackModules.getByProps('marginBottom8'),
    list: WebpackModules.getByProps('empty', 'emptyIconStreamerMode', 'emptyText'),
    infoSection: WebpackModules.getByProps('infoScroller'),
    roleTag: WebpackModules.getByProps('roleTag'),
    role: WebpackModules.getByProps('role')
};

export default function GuildRoles({ guild }) {
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hide);
    const roles = Object.values(guild.roles)?.sort((b, a) => a.position - b.position);

    if (hide) {
        return (
            <div className={classes.list.empty}>
                <div className={classes.list.emptyIconStreamerMode} />
                <div className={classes.list.emptyText}>{i18n.Messages.STREAMER_MODE_ENABLED}</div>
            </div>
        );
    }

    return (
        <ScrollerThin className={`${classes.infoSection.infoScroller} guild-roles`} fade={true}>
            <div className={classes.role.root}>
                {roles.map(role => {
                    return (
                        <div key={role.id} className={classes.role.role}>
                            <div
                                className={classes.role.roleCircle}
                                style={{ backgroundColor: role.colorString ?? HEXColors.PRIMARY_DARK_300 }}
                            />
                            <Text selectable={false} className={classes.role.roleName}>
                                {role.name}
                            </Text>
                        </div>
                    );
                })}
            </div>
        </ScrollerThin>
    );
}
