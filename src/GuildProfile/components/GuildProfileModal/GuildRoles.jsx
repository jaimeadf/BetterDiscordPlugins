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

export default function GuildRoles({ guild }) {
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hide);
    const roles = Object.values(guild.roles)?.sort((b, a) => a.position - b.position);

    if (hide) {
        return (
            <div className="empty-2zcusz">
                <div className="emptyIconStreamerMode-3P4I-V emptyIcon-uKVxYR" />
                <div className="emptyText-mZZyQk">{i18n.Messages.STREAMER_MODE_ENABLED}</div>
            </div>
        );
    }

    return (
        <ScrollerThin className="infoScroller-1QMpon guild-roles" fade={true}>
            <div className="root-jbEB5E flex-3BkGQD wrap-7NZuTn">
                {roles.map(role => {
                    return (
                        <div key={role.id} className="role-2TIOKu flex-3BkGQD alignCenter-14kD11">
                            <div
                                className="roleCircle-1EgnFN flex-3BkGQD alignCenter-14kD11 justifyCenter-rrurWZ desaturateUserColors-1O-G89"
                                style={{ backgroundColor: role.colorString ?? HEXColors.PRIMARY_DARK_300 }}
                            />
                            <Text selectable={false} className="roleName-2ZJJYR">
                                {role.name}
                            </Text>
                        </div>
                    );
                })}
            </div>
        </ScrollerThin>
    );
}
