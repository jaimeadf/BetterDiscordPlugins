/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React, { useEffect } from 'react';
import moment from 'moment';

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
    Timestamps,
    DiscordConstants: { VerificationLevels, GuildExplicitContentFilterTypes, GuildNSFWContentLevel }
} = DiscordModules;

const StreamerModeStore = WebpackModules.getByProps('hidePersonalInformation');
const UserMention = WebpackModules.getByDisplayName('UserMention');
const UserFetcher = WebpackModules.getByProps('getUser', 'fetchCurrentUser');

const GuildExplicitContentFilterTypesMessages = {
    [GuildExplicitContentFilterTypes.DISABLED]: 'EXPLICIT_CONTENT_FILTER_DISABLED',
    [GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]: 'EXPLICIT_CONTENT_FILTER_MEDIUM',
    [GuildExplicitContentFilterTypes.ALL_MEMBERS]: 'EXPLICIT_CONTENT_FILTER_HIGH'
};

function InfoSection({ title, children }) {
    return (
        <FormSection className="marginBottom8-emkd0_ section" tag="h5" title={title}>
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

    return (
        <ScrollerThin className="infoScroller-1QMpon guild-info" fade={true}>
            {hide ? (
                <div className="empty-2zcusz">
                    <div className="emptyIconStreamerMode-3P4I-V emptyIcon-uKVxYR" />
                    <div className="emptyText-mZZyQk">{i18n.Messages.STREAMER_MODE_ENABLED}</div>
                </div>
            ) : (
                <Flex justify={Flex.Justify.START} wrap={Flex.Wrap.WRAP}>
                    <InfoSection title={i18n.Messages.GUILD_OWNER}>
                        {owner ? (
                            <UserMention className="mention" userId={owner.id} channelId={channel?.id} />
                        ) : (
                            `${i18n.Messages.GUILD_PROFILE_LOADING}...`
                        )}
                    </InfoSection>
                    {guild.description && (
                        <InfoSection title={i18n.Messages.FORM_LABEL_SERVER_DESCRIPTION}>
                            {guild.description}
                        </InfoSection>
                    )}
                    {guild.vanityURLCode && (
                        <InfoSection title={i18n.Messages.VANITY_URL}>
                            <Anchor href={`https://discord.gg/${guild.vanityURLCode}`}>
                                discord.gg/{guild.vanityURLCode}
                            </Anchor>
                        </InfoSection>
                    )}
                    <InfoSection title={i18n.Messages.GUILD_PROFILE_CREATED_AT}>
                        {moment(Timestamps.extractTimestamp(guild.id)).format('LLL')}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.GUILD_PROFILE_JOINED_AT}>
                        {moment(guild.joinedAt).format('LLL')}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.FORM_LABEL_VERIFICATION_LEVEL}>
                        {i18n.Messages[`VERIFICATION_LEVEL_${VerificationLevels[guild.verificationLevel]}`]}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.FORM_LABEL_EXPLICIT_CONTENT_FILTER}>
                        {i18n.Messages[GuildExplicitContentFilterTypesMessages[guild.explicitContentFilter]]}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT}>
                        {guild.premiumSubscriberCount}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.GUILD_PROFILE_GUILD_PREMIUM_TIER}>
                        {guild.premiumTier}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.FORM_LABEL_SERVER_LANGUAGE}>
                        {i18n.Messages[guild.preferredLocale]}
                    </InfoSection>
                    <InfoSection title={i18n.Messages.GUILD_PROFILE_NSFW_LEVEL}>
                        {i18n.Messages[`GUILD_PROFILE_NSFW_LEVEL_${GuildNSFWContentLevel[guild.nsfwLevel]}`]}
                    </InfoSection>
                </Flex>
            )}
        </ScrollerThin>
    );
}
