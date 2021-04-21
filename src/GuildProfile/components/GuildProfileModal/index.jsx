/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { clipboard } from 'electron';

import { DiscordModules, WebpackModules } from '@zlibrary/api';

import { useStateFromStores } from '@discord/Flux';
import i18n from '@discord/i18n';

import Flex from '@discord/components/Flex';
import Clickable from '@discord/components/Clickable';
import { TooltipContainer } from '@discord/components/Tooltip';
import Text from '@discord/components/Text';
import TabBar from '@discord/components/TabBar';

import GuildInfo from './GuildInfo';
import Relationships from './Relationships';

import FeatureIcons from '../../assets/features';

import MemberCountsStore from '../../stores/MemberCountsStore';

const {
    ContextMenuActions,
    ImageResolver,
    DiscordConstants: { RelationshipTypes }
} = DiscordModules;

const InviteButton = WebpackModules.getByDisplayName('InviteButton');
const { GuildIcon } = WebpackModules.getByProps('GuildIcon');
const GuildBadge = WebpackModules.getByDisplayName('GuildBadge');
const NativeImageContextMenu = WebpackModules.getByDisplayName('NativeImageContextMenu');

const classes = {
    ...WebpackModules.getByProps('guildDetail'),
    ...WebpackModules.getByProps('wrapper', 'pointer'),
    ...WebpackModules.getByProps('guildIconContainer'),
    ...WebpackModules.getByProps('tabBarContainer'),
    ...WebpackModules.getByProps('profileBadge')
};

function MemberCounts({ guild }) {
    const { members, membersOnline } = useStateFromStores([MemberCountsStore], () =>
        MemberCountsStore.getMemberCounts(guild.id)
    );

    return <InviteButton.Data members={members} membersOnline={membersOnline} />;
}

export const GuildProfileSections = {
    GUILD_INFO: 'GUILD_INFO',
    FRIENDS: 'FRIENDS',
    BLOCKED_USERS: 'BLOCKED_USERS'
};

export default class GuildProfileModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: props.section ?? GuildProfileSections.GUILD_INFO
        };

        this.handleGuildIconClick = this.handleGuildIconClick.bind(this);
        this.handleGuildIconContextMenu = this.handleGuildIconContextMenu.bind(this);
        this.handleSectionSelect = this.handleSectionSelect.bind(this);
    }

    render() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        const features = Array.from(guild.features);

        const guildIcon = (
            <GuildIcon className={`icon ${classes.avatar} ${classes.wrapper}`} animate={true} guild={guild} />
        );

        return (
            <Flex className={`guild-profile ${classes.root}`} direction={Flex.Direction.VERTICAL}>
                <div className={classes.topSectionNormal}>
                    <header className={classes.header}>
                        {guild.icon ? (
                            <Clickable
                                onClick={this.handleGuildIconClick}
                                onContextMenu={this.handleGuildIconContextMenu.bind}
                            >
                                <TooltipContainer
                                    position="top"
                                    text={i18n.Messages.GUILD_PROFILE_CLICK_TO_COPY_SERVER_ICON_URL}
                                >
                                    {guildIcon}
                                </TooltipContainer>
                            </Clickable>
                        ) : (
                            guildIcon
                        )}
                        <div className={classes.headerInfo}>
                            <div className={classes.nameTag}>
                                <GuildBadge
                                    className={classes.guildIconContainer}
                                    size={20}
                                    tooltipColor="black"
                                    tooltipPosition="top"
                                    guild={guild}
                                />
                                <span className={classes.username}>{guild.name}</span>
                            </div>
                            {features.length > 0 && (
                                <div className={`${classes.container} ${classes.colored} ${classes.profileBadges}`}>
                                    {features.map(feature => this.renderFeatureBadge(feature))}
                                </div>
                            )}
                            <Text className={classes.guildDetail}>
                                <MemberCounts guild={guild} />
                            </Text>
                        </div>
                    </header>
                    <div>
                        <div className={classes.tabBarContainer}>
                            <TabBar
                                className={classes.tabBar}
                                selectedItem={selectedSection}
                                type={TabBar.Types.TOP}
                                onItemSelect={this.handleSectionSelect}
                            >
                                <TabBar.Item className={classes.tabBarItem} id={GuildProfileSections.GUILD_INFO}>
                                    {i18n.Messages.GUILD_PROFILE_GUILD_INFO}
                                </TabBar.Item>
                                <TabBar.Item className={classes.tabBarItem} id={GuildProfileSections.FRIENDS}>
                                    {i18n.Messages.GUILD_PROFILE_FRIENDS_IN_GUILD}
                                </TabBar.Item>
                                <TabBar.Item className={classes.tabBarItem} id={GuildProfileSections.BLOCKED_USERS}>
                                    {i18n.Messages.GUILD_PROFILE_BLOCKED_USERS_IN_GUILD}
                                </TabBar.Item>
                            </TabBar>
                        </div>
                    </div>
                </div>
                <div className={classes.body}>{this.renderSelectedSection()}</div>
            </Flex>
        );
    }

    renderFeatureBadge(feature) {
        const Icon = FeatureIcons[feature];

        return Icon ? (
            <div className={classes.profileBadgeWrapper}>
                <TooltipContainer position="top" text={i18n.Messages[`GUILD_PROFILE_${feature}`]}>
                    <Clickable role="button" tag="div">
                        <Icon className={`${classes.profileBadge} badge`} />
                    </Clickable>
                </TooltipContainer>
            </div>
        ) : null;
    }

    renderSelectedSection() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        switch (selectedSection) {
            case GuildProfileSections.FRIENDS:
                return <Relationships guild={guild} relationshipType={RelationshipTypes.FRIEND} />;
            case GuildProfileSections.BLOCKED_USERS:
                return <Relationships guild={guild} relationshipType={RelationshipTypes.BLOCKED} />;
            default:
                return <GuildInfo guild={guild} />;
        }
    }

    handleGuildIconClick() {
        clipboard.writeText(this.getGuildIconURL());
    }

    handleGuildIconContextMenu(event) {
        ContextMenuActions.openContextMenu(event, () => (
            <NativeImageContextMenu {...event} src={this.getGuildIconURL()} />
        ));
    }

    handleSectionSelect(section) {
        this.setState({
            selectedSection: section
        });
    }

    getGuildIconURL() {
        const { guild } = this.props;

        return ImageResolver.getGuildIconURL({
            id: guild.id,
            icon: guild.icon,
            size: 1024,
            format: ImageResolver.hasAnimatedGuildIcon(guild.icon) ? 'gif' : 'png'
        });
    }
}
