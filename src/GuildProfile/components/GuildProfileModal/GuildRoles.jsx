/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';

import { WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';
import i18n from '@discord/i18n';
import StreamerModeStore from '@discord/stores/StreamerModeStore';

import { ScrollerThin } from '@discord/components/Scroller';

const { MemberRole } = WebpackModules.getByProps('MemberRole');

export default function GuildRoles({ guild }) {
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hidePersonalInformation);
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
                {roles.map(role => (
                    <MemberRole key={role.id} guildId={guild.id} role={role} canRemove={false} />
                ))}
            </div>
        </ScrollerThin>
    );
}
