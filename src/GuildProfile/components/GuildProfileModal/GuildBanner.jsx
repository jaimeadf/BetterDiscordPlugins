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

export default function GuildBanner({ guild }) {
    const dominantColor = useDominantColor(guild.getIconURL(), Colors.TRANSPARENT);

    return (
        <div
            className={`banner-1YaD3N ${
                guild.banner ? 'profileBannerPremium-KD60EB bannerPremium-kkSkPv' : 'profileBanner-1owKI5'
            }`}
            style={{
                backgroundColor: dominantColor,
                backgroundImage: `url(${ImageResolver.getGuildBannerURL({ id: guild.id, banner: guild.banner })})`
            }}
        />
    );
}
