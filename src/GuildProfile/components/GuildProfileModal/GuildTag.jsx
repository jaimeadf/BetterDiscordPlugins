/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { WebpackModules } from '@zlibrary/api';

const GuildBadge = WebpackModules.getByDisplayName('GuildBadge');

export default function GuildTag({ className, usernameClass, guild }) {
    return (
        <div className={`${className} botTag-7aX5WZ guild-tag`}>
            <div className="guildIconContainer-3QvE6w">
                <GuildBadge className="guildBadge-3_UK6z" guild={guild} size={20} />
            </div>
            <span className={`username-3JLfHz ${usernameClass}`}>{guild.name}</span>
        </div>
    );
}
