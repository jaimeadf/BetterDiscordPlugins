/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';
import { DiscordModules, WebpackModules } from '@zlibrary/api';

import i18n from '@discord/i18n';
import TabBar from '@discord/components/TabBar';

import GuildProfileModalHeader from './GuildProfileModalHeader';
import Relationships from './Relationships';
import GuildInfo from './GuildInfo';

const {
    DiscordConstants: { RelationshipTypes }
} = DiscordModules;

const { ModalRoot } = WebpackModules.getByProps('ModalRoot');

const classes = WebpackModules.getByProps('root', 'topSection', 'body');

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

        this.handleSectionSelect = this.handleSectionSelect.bind(this);
    }

    render() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        return (
            <ModalRoot className={`${classes.root} guild-profile`} transitionState={1}>
                <div className={classes.topSection}>
                    <GuildProfileModalHeader guild={guild} />
                    <div className={classes.tabBarContainer}>
                        <TabBar
                            className={classes.tabBar}
                            type={TabBar.Types.TOP}
                            selectedItem={selectedSection}
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
                <div className={classes.body}>{this.renderSelectedSection()}</div>
            </ModalRoot>
        );
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

    handleSectionSelect(section) {
        this.setState({ selectedSection: section });
    }
}
