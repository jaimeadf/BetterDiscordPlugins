/*@license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import { DiscordModules } from '@zlibrary/api';

import VerifiedIcon from './verified.svg';
import InviteSplashIcon from './invite-splash.svg';
import VipRegionsIcon from './vip-regions.svg';
import VanityUrlIcon from './vanity-url.svg';
import MoreEmojiIcon from './more-emoji.svg';
import CommerceIcon from './commerce.svg';
import DiscoverableIcon from './discoverable.svg';
import CommunityIcon from './community.svg';
import FeaturableIcon from './featurable.svg';
import NewsIcon from './news.svg';
import AnimatedIcon from './animated-icon.svg';
import BannerIcon from './banner.svg';
import AnimatedBannerIcon from './animated-banner.svg';
import EnabledDiscoverableBeforeIcon from './enabled-discoverable-before.svg';
import WelcomeScreenEnabledIcon from './welcome-screen-enabled.svg';
import MemberVerificationGateEnabledIcon from './member-verification-gate-enabled.svg';
import PreviewEnabledIcon from './preview-enabled.svg';
import NewThreadPermissionsIcon from './new-thread-permissions.svg';
import PrivateThreadsIcon from './private-threads.svg';
import ThreadsEnabledIcon from './threads-enabled.svg';
import RoleIconsIcon from './role-icons.svg';
import TextInVoiceEnabledIcon from './text-in-voice-enabled.svg';
import ThreeDayThreadArchiveIcon from './three-day-thread-archive.svg';
import SevenDayThreadArchiveIcon from './seven-day-thread-archive.svg';
import MemberProfilesIcon from './member-profiles.svg';
import AutoModerationIcon from './auto-moderation.svg';

const {
    DiscordConstants: { GuildFeatures }
} = DiscordModules;

export default {
    [GuildFeatures.VERIFIED]: VerifiedIcon,
    [GuildFeatures.INVITE_SPLASH]: InviteSplashIcon,
    [GuildFeatures.VIP_REGIONS]: VipRegionsIcon,
    [GuildFeatures.VANITY_URL]: VanityUrlIcon,
    [GuildFeatures.MORE_EMOJI]: MoreEmojiIcon,
    [GuildFeatures.COMMERCE]: CommerceIcon,
    [GuildFeatures.DISCOVERABLE]: DiscoverableIcon,
    [GuildFeatures.COMMUNITY]: CommunityIcon,
    [GuildFeatures.FEATURABLE]: FeaturableIcon,
    [GuildFeatures.NEWS]: NewsIcon,
    [GuildFeatures.ANIMATED_ICON]: AnimatedIcon,
    [GuildFeatures.BANNER]: BannerIcon,
    [GuildFeatures.ANIMATED_BANNER]: AnimatedBannerIcon,
    [GuildFeatures.ENABLED_DISCOVERABLE_BEFORE]: EnabledDiscoverableBeforeIcon,
    [GuildFeatures.WELCOME_SCREEN_ENABLED]: WelcomeScreenEnabledIcon,
    [GuildFeatures.MEMBER_VERIFICATION_GATE_ENABLED]: MemberVerificationGateEnabledIcon,
    [GuildFeatures.PREVIEW_ENABLED]: PreviewEnabledIcon,
    [GuildFeatures.NEW_THREAD_PERMISSIONS]: NewThreadPermissionsIcon,
    [GuildFeatures.PRIVATE_THREADS]: PrivateThreadsIcon,
    [GuildFeatures.THREADS_ENABLED]: ThreadsEnabledIcon,
    [GuildFeatures.ROLE_ICONS]: RoleIconsIcon,
    [GuildFeatures.TEXT_IN_VOICE_ENABLED]: TextInVoiceEnabledIcon,
    ['THREE_DAY_THREAD_ARCHIVE']: ThreeDayThreadArchiveIcon,
    ['SEVEN_DAY_THREAD_ARCHIVE']: SevenDayThreadArchiveIcon,
    ['MEMBER_PROFILES']: MemberProfilesIcon,
    ['AUTO_MODERATION']: AutoModerationIcon
};
