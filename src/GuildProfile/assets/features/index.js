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
import DiscoverableIcon from './discoverable.svg';
import CommunityIcon from './community.svg';
import FeaturableIcon from './featurable.svg';
import NewsIcon from './news.svg';
import AnimatedIcon from './animated-icon.svg';
import BannerIcon from './banner.svg';
import EnabledDiscoverableBeforeIcon from './enabled-discoverable-before.svg';
import WelcomeScreenEnabledIcon from './welcome-screen-enabled.svg';
import MemberVerificationGateEnabledIcon from './member-verification-gate-enabled.svg';
import PreviewEnabledIcon from './preview-enabled.svg';

const { DiscordConstants: { GuildFeatures } } = DiscordModules;

export default {
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
    [GuildFeatures.ENABLED_DISCOVERABLE_BEFORE]: EnabledDiscoverableBeforeIcon,
    [GuildFeatures.WELCOME_SCREEN_ENABLED]: WelcomeScreenEnabledIcon,
    [GuildFeatures.MEMBER_VERIFICATION_GATE_ENABLED]: MemberVerificationGateEnabledIcon,
    [GuildFeatures.PREVIEW_ENABLED]: PreviewEnabledIcon,
};
