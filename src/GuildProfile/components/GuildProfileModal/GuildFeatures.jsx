/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { WebpackModules } from '@zlibrary/api';

import i18n from '@discord/i18n';

import { TooltipContainer } from '@discord/components/Tooltip';
import Clickable from '@discord/components/Clickable';

import FeatureIcons from '../../assets/features';

const classes = WebpackModules.getByProps('container', 'profileBadge24');

export default function GuildFeatures({ className, guild }) {
    const features = Array.from(guild.features);

    return (
        <div className={`${className} ${classes.container}`}>
            {features.map(feature => {
                const Icon = FeatureIcons[feature];

                if (!Icon) {
                    return null;
                }

                return (
                    <TooltipContainer key={feature} text={i18n.Messages[`GUILD_PROFILE_${feature}`]}>
                        <Clickable>
                            <Icon className={`${classes.profileBadge24}`} />
                        </Clickable>
                    </TooltipContainer>
                );
            })}
        </div>
    );
}
