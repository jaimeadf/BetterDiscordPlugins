/*@license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import { DiscordModules } from '@zlibrary/api';

import InviteSplashIcon from './invite-splash.svg';
import VipRegionsIcon from './vip-regions.svg';
import VanityUrlIcon from './vanity-url.svg';
import MoreEmojiIcon from './more-emoji.svg';
import CommerceIcon from './commerce.svg';
import AutoModerationIcon from './auto-moderation.svg';
import DiscoverableIcon from './discoverable.svg';
import CommunityIcon from './community.svg';
import FeaturableIcon from './featurable.svg';
import NewsIcon from './news.svg';
import AnimatedIcon from './animated-icon.svg';
import AnimatedBannerIcon from './animated-banner.svg';
import ServerBannerIcon from './server-banner.svg';
import EnabledDiscoverableBeforeIcon from './enabled-discoverable-before.svg';
import WelcomeScreenEnabledIcon from './welcome-screen-enabled.svg';
import MemberVerificationGateEnabledIcon from './member-verification-gate-enabled.svg';
import VerifiedIcon from './verified.svg';
import NewThreadPermissionsIcon from './new-thread-permissions.svg';
import PreviewEnabledIcon from './preview-enabled.svg';
import TextInVoiceEnabledIcon from './text_in_voice_enabled.svg';
import PrivateThreadsIcon from './private-threads.svg';
import ThreadsEnabledIcon from './threads-enabled.svg';
import RoleIconsIcon from './role-icons.svg';
import MemberProfilesIcon from './member-profiles.svg';
import ThreeDayThreadArchiveIcon from './three-day-thread-archive.svg';
import SevenDayThreadArchiveIcon from './seven-day-thread-archive.svg';

const {
    DiscordConstants: { GuildFeatures }
} = DiscordModules;

export default {
    [GuildFeatures.INVITE_SPLASH]: InviteSplashIcon,
    [GuildFeatures.VIP_REGIONS]: VipRegionsIcon,
    [GuildFeatures.VANITY_URL]: VanityUrlIcon,
    [GuildFeatures.MORE_EMOJI]: MoreEmojiIcon,
    [GuildFeatures.COMMERCE]: CommerceIcon,
    [GuildFeatures.DISCOVERABLE]: DiscoverableIcon,
    [GuildFeatures.COMMUNITY]: CommunityIcon,
    ['AUTO_MODERATION']: AutoModerationIcon,
    [GuildFeatures.FEATURABLE]: FeaturableIcon,
    [GuildFeatures.NEWS]: NewsIcon,
    [GuildFeatures.ANIMATED_ICON]: AnimatedIcon,
    ['ANIMATED_BANNER']: AnimatedBannerIcon,
    [GuildFeatures.BANNER]: ServerBannerIcon,
    [GuildFeatures.ENABLED_DISCOVERABLE_BEFORE]: EnabledDiscoverableBeforeIcon,
    [GuildFeatures.WELCOME_SCREEN_ENABLED]: WelcomeScreenEnabledIcon,
    [GuildFeatures.MEMBER_VERIFICATION_GATE_ENABLED]: MemberVerificationGateEnabledIcon,
    ['VERIFIED']: VerifiedIcon,
    ['NEW_THREAD_PERMISSIONS']: NewThreadPermissionsIcon,
    [GuildFeatures.PREVIEW_ENABLED]: PreviewEnabledIcon,
    ['TEXT_IN_VOICE_ENABLED']: TextInVoiceEnabledIcon,
    [GuildFeatures.PRIVATE_THREADS]: PrivateThreadsIcon,
    [GuildFeatures.THREADS_ENABLED]: ThreadsEnabledIcon,
    [GuildFeatures.ROLE_ICONS]: RoleIconsIcon,
    ['MEMBER_PROFILES']: MemberProfilesIcon,
    ['THREE_DAY_THREAD_ARCHIVE']: ThreeDayThreadArchiveIcon,
    ['SEVEN_DAY_THREAD_ARCHIVE']: SevenDayThreadArchiveIcon
};
