/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { DiscordModules } from '@zlibrary/api';

import i18n from '@discord/i18n';
import TabBar from '@discord/components/TabBar';

import GuildProfileModalHeader from './GuildProfileModalHeader';
import Relationships from './Relationships';
import GuildInfo from './GuildInfo';
import GuildRoles from './GuildRoles';

const {
    DiscordConstants: { RelationshipTypes }
} = DiscordModules;

export const GuildProfileSections = {
    GUILD_INFO: 'GUILD_INFO',
    GUILD_ROLES: 'GUILD_ROLES',
    FRIENDS: 'FRIENDS',
    BLOCKED_USERS: 'BLOCKED_USERS'
};

export default class GuildProfileModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedSection: props.section ?? GuildProfileSections.GUILD_INFO
        };

        this.handleSectionSelect = this.handleSectionSelect.bind(this);
    }

    render() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        return (
            <>
                <div className="topSection-13QKHs">
                    <GuildProfileModalHeader guild={guild} />
                    <div className="tabBarContainer-sCZC4w">
                        <TabBar
                            className="tabBar-2hXqzU"
                            type={TabBar.Types.TOP}
                            selectedItem={selectedSection}
                            onItemSelect={this.handleSectionSelect}
                        >
                            <TabBar.Item className="tabBarItem-30Te4-" id={GuildProfileSections.GUILD_INFO}>
                                {i18n.Messages.GUILD_PROFILE_GUILD_INFO}
                            </TabBar.Item>
                            <TabBar.Item className="tabBarItem-30Te4-" id={GuildProfileSections.GUILD_ROLES}>
                                {i18n.Messages.GUILD_PROFILE_ROLES_IN_GUILD}
                            </TabBar.Item>
                            <TabBar.Item className="tabBarItem-30Te4-" id={GuildProfileSections.FRIENDS}>
                                {i18n.Messages.GUILD_PROFILE_FRIENDS_IN_GUILD}
                            </TabBar.Item>
                            <TabBar.Item className="tabBarItem-30Te4-" id={GuildProfileSections.BLOCKED_USERS}>
                                {i18n.Messages.GUILD_PROFILE_BLOCKED_USERS_IN_GUILD}
                            </TabBar.Item>
                        </TabBar>
                    </div>
                </div>
                <div className="body-1Ukv50">{this.renderSelectedSection()}</div>
            </>
        );
    }

    renderSelectedSection() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        switch (selectedSection) {
            case GuildProfileSections.GUILD_ROLES:
                return <GuildRoles guild={guild} />;
            case GuildProfileSections.FRIENDS:
                return <Relationships guild={guild} relationshipType={RelationshipTypes.FRIEND} />;
            case GuildProfileSections.BLOCKED_USERS:
                return <Relationships guild={guild} relationshipType={RelationshipTypes.BLOCKED} />;
            default:
                return <GuildInfo guild={guild} />;
        }
    }

    handleSectionSelect(section) {
        this.setState({ selectedSection: section });
    }
}
