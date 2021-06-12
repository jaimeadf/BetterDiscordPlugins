/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

const {
    ImageResolver,
    DiscordConstants: { Colors }
} = DiscordModules;

const { default: useDominantColor } = WebpackModules.getByProps('maybeFetchColor');

const classes = WebpackModules.getByProps('banner', 'profileBanner', 'profileBannerPremium');

export default function GuildBanner({ guild }) {
    const dominantColor = useDominantColor(guild.getIconURL(), Colors.TRANSPARENT);

    return (
        <div
            className={`${classes.banner.banner} ${
                guild.banner ? classes.profileBannerPremium : classes.profileBanner
            }`}
            style={{
                backgroundColor: dominantColor,
                backgroundImage: `url(${ImageResolver.getGuildBannerURL({ id: guild.id, banner: guild.banner })})`
            }}
        />
    );
}
