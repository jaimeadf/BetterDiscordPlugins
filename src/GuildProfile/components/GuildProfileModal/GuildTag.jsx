/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { WebpackModules } from '@zlibrary/api';

const GuildBadge = WebpackModules.getByDisplayName('GuildBadge');

const classes = {
    nameTag: WebpackModules.getByProps('nameTag', 'username', 'bot'),
    guildHeader: WebpackModules.getByProps('guildIconContainer', 'guildBadge'),
    botTag: WebpackModules.getByProps('botTag', 'botTagRegular', 'px', 'botText')
};

export default function GuildTag({ className, usernameClass, guild }) {
    return (
        <div className={`${className} ${classes.nameTag.nameTag} guild-tag`}>
            <div className={classes.guildHeader.guildIconContainer}>
                <GuildBadge className={classes.guildHeader.guildBadge} guild={guild} size={20} />
            </div>
            <span className={`${classes.nameTag.username} ${usernameClass}`}>{guild.name}</span>
        </div>
    );
}
