/*@license
 * Copyright (c) 2021 NurMarvin (Marvin Witt) & jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React, { useEffect } from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

const {
    Flux,
    UserStore,
    StreamerModeStore,
    GuildChannelsStore,
    i18n: { Messages },
    Moment,
    Timestamps,
    FormSection,
    TextElement,
    ScrollerThin,
    Flex,
    Anchor,
    DiscordConstants: { VerificationLevels, GuildExplicitContentFilterTypes }
} = DiscordModules;

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
            <TextElement selectable={true}>{children}</TextElement>
        </FormSection>
    );
}

function GuildInfo({ guild, owner, hide, channel }) {
    useEffect(() => {
        if (!owner) {
            UserFetcher.getUser(guild.ownerId);
        }
    }, [guild, owner]);

    if (hide) {
        return (
            <div className={classes.empty}>
                <div className={classes.emptyIconStreamerMode} />
                <div className={classes.emptyText}>{Messages.STREAMER_MODE_ENABLED}</div>
            </div>
        );
    }

    return (
        <ScrollerThin className={`${classes.infoScroller} guild-info`} fade={true}>
            <Flex justify={Flex.Justify.START} wrap={Flex.Wrap.WRAP}>
                <Section title={Messages.GUILD_OWNER}>
                    {owner ? (
                        <UserMention className="mention" userId={owner.id} channelId={channel?.id} />
                    ) : (
                        `${Messages.GUILD_PROFILE_LOADING}...`
                    )}
                </Section>
                {guild.description && (
                    <Section title={Messages.FORM_LABEL_SERVER_DESCRIPTION}>{guild.description}</Section>
                )}
                {guild.vanityURLCode && (
                    <Section title={Messages.VANITY_URL}>
                        <Anchor href={`https://discord.gg/${guild.vanityURLCode}`}>
                            discord.gg/{guild.vanityURLCode}
                        </Anchor>
                    </Section>
                )}
                <Section title={Messages.GUILD_PROFILE_CREATED_AT}>
                    {Moment(Timestamps.extractTimestamp(guild.id)).format('LLL')}
                </Section>
                <Section title={Messages.GUILD_PROFILE_JOINED_AT}>{Moment(guild.joinedAt).format('LLL')}</Section>
                <Section title={Messages.FORM_LABEL_VERIFICATION_LEVEL}>
                    {Messages[`VERIFICATION_LEVEL_${VerificationLevels[guild.verificationLevel]}`]}
                </Section>
                <Section title={Messages.FORM_LABEL_EXPLICIT_CONTENT_FILTER}>
                    {Messages[GuildExplicitContentFilterTypesMessages[guild.explicitContentFilter]]}
                </Section>
                <Section title={Messages.GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT}>
                    {guild.premiumSubscriberCount}
                </Section>
                <Section title={Messages.GUILD_PROFILE_GUILD_PREMIUM_TIER}>{guild.premiumTier}</Section>
                <Section title={Messages.FORM_LABEL_SERVER_LANGUAGE}>{Messages[guild.preferredLocale]}</Section>
            </Flex>
        </ScrollerThin>
    );
}

export default Flux.connectStores([UserStore, StreamerModeStore, GuildChannelsStore], ({ guild }) => ({
    owner: UserStore.getUser(guild.ownerId),
    hide: StreamerModeStore.hidePersonalInformation,
    channel: GuildChannelsStore.getDefaultChannel(guild.id)
}))(GuildInfo);
