/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React, { useEffect } from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';
import i18n from '@discord/i18n';

import { FormSection } from '@discord/components/Form';
import Text from '@discord/components/Text';
import { ScrollerThin } from '@discord/components/Scroller';
import Flex from '@discord/components/Flex';
import Anchor from '@discord/components/Anchor';

const {
    UserStore,
    GuildChannelsStore,
    Moment,
    Timestamps,
    DiscordConstants: { VerificationLevels, GuildExplicitContentFilterTypes }
} = DiscordModules;

const StreamerModeStore = WebpackModules.getByProps('hidePersonalInformation');
const UserMention = WebpackModules.getByDisplayName('UserMention');
const UserFetcher = WebpackModules.getByProps('getUser', 'fetchCurrentUser');

const classes = {
    ...WebpackModules.getByProps('marginBottom8'),
    ...WebpackModules.getByProps('body', 'empty'),
    ...WebpackModules.getByProps('emptyIcon')
};

const GuildExplicitContentFilterTypesMessages = {
    [GuildExplicitContentFilterTypes.DISABLED]: 'EXPLICIT_CONTENT_FILTER_DISABLED',
    [GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]: 'EXPLICIT_CONTENT_FILTER_MEDIUM',
    [GuildExplicitContentFilterTypes.ALL_MEMBERS]: 'EXPLICIT_CONTENT_FILTER_HIGH'
};

function Section({ title, children }) {
    return (
        <FormSection className={`${classes.marginBottom8} section`} tag="h5" title={title}>
            <Text selectable={true}>{children}</Text>
        </FormSection>
    );
}

export default function GuildInfo({ guild }) {
    const owner = useStateFromStores([UserStore], () => UserStore.getUser(guild.ownerId));
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hide);
    const channel = useStateFromStores([GuildChannelsStore], () => GuildChannelsStore.getDefaultChannel(guild.id));

    useEffect(() => {
        if (!owner) {
            UserFetcher.getUser(guild.ownerId);
        }
    }, [guild, owner]);

    if (hide) {
        return (
            <div className={classes.empty}>
                <div className={classes.emptyIconStreamerMode} />
                <div className={classes.emptyText}>{i18n.Messages.STREAMER_MODE_ENABLED}</div>
            </div>
        );
    }

    return (
        <ScrollerThin className={`${classes.infoScroller} guild-info`} fade={true}>
            <Flex justify={Flex.Justify.START} wrap={Flex.Wrap.WRAP}>
                <Section title={i18n.Messages.GUILD_OWNER}>
                    {owner ? (
                        <UserMention className="mention" userId={owner.id} channelId={channel?.id} />
                    ) : (
                        `${i18n.Messages.GUILD_PROFILE_LOADING}...`
                    )}
                </Section>
                {guild.description && (
                    <Section title={i18n.Messages.FORM_LABEL_SERVER_DESCRIPTION}>{guild.description}</Section>
                )}
                {guild.vanityURLCode && (
                    <Section title={i18n.Messages.VANITY_URL}>
                        <Anchor href={`https://discord.gg/${guild.vanityURLCode}`}>
                            discord.gg/{guild.vanityURLCode}
                        </Anchor>
                    </Section>
                )}
                <Section title={i18n.Messages.GUILD_PROFILE_CREATED_AT}>
                    {Moment(Timestamps.extractTimestamp(guild.id)).format('LLL')}
                </Section>
                <Section title={i18n.Messages.GUILD_PROFILE_JOINED_AT}>{Moment(guild.joinedAt).format('LLL')}</Section>
                <Section title={i18n.Messages.FORM_LABEL_VERIFICATION_LEVEL}>
                    {i18n.Messages[`VERIFICATION_LEVEL_${VerificationLevels[guild.verificationLevel]}`]}
                </Section>
                <Section title={i18n.Messages.FORM_LABEL_EXPLICIT_CONTENT_FILTER}>
                    {i18n.Messages[GuildExplicitContentFilterTypesMessages[guild.explicitContentFilter]]}
                </Section>
                <Section title={i18n.Messages.GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT}>
                    {guild.premiumSubscriberCount}
                </Section>
                <Section title={i18n.Messages.GUILD_PROFILE_GUILD_PREMIUM_TIER}>{guild.premiumTier}</Section>
                <Section title={i18n.Messages.FORM_LABEL_SERVER_LANGUAGE}>
                    {i18n.Messages[guild.preferredLocale]}
                </Section>
            </Flex>
        </ScrollerThin>
    );
}
