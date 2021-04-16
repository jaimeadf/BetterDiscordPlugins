/*@license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

import React from 'react';

import {
    DiscordModules,
    WebpackModules,
    PluginUtilities,
    Patcher,
    Utilities,
    DiscordContextMenu
} from '@zlibrary/api';
import Plugin from '@zlibrary/plugin';

import GuildProfileModal from './components/GuildProfileModal';
import GuildProfileIcon from './assets/guild-profile.svg';

import MemberCountsStore from './stores/MemberCountsStore';

import style from './style.scss';
import locales from './locales';

const {
    ModalStack,
    UserSettingsStore,
    SelectedGuildStore,
    GuildStore,
    i18n
} = DiscordModules;
const { Messages } = i18n;

export default class GuildProfile extends Plugin {
    onStart() {
        PluginUtilities.addStyle(this.getName(), style);
        UserSettingsStore.addChangeListener(this.handleUserSettingsChange);

        MemberCountsStore.initializeIfNeeded();

        this.loadLocale();
        this.patchMenu();
        this.patchContextMenu();
    }

    onStop() {
        PluginUtilities.removeStyle(this.getName());
        UserSettingsStore.removeChangeListener(this.handleUserSettingsChange);

        Patcher.unpatchAll();
    }

    patchMenu() {
        const Menu = WebpackModules.getByProps('MenuItem');

        Patcher.before(Menu, 'default', (thisObject, [{ navId, children }]) => {
            if (navId !== 'guild-header-popout' || Utilities.findInReactTree(children, c => c?.id === 'guild-profile')) {
                return;
            }

            children.unshift(
                <Menu.MenuGroup>
                    <Menu.MenuItem
                        id="guild-profile"
                        label={Messages.GUILD_PROFILE}
                        icon={GuildProfileIcon}
                        action={() => this.openGuildProfileModal(GuildStore.getGuild(SelectedGuildStore.getGuildId()))}
                    />
                </Menu.MenuGroup>
            );
        });
    }

    patchContextMenu() {
        const GuildContextMenu = WebpackModules.getModule(m => m?.default?.displayName === 'GuildContextMenu');

        Patcher.after(GuildContextMenu, 'default', (thisObject, [{ guild }], returnValue) => {
            returnValue.props.children.unshift(
                DiscordContextMenu.buildMenuItem({
                    label: Messages.GUILD_PROFILE,
                    action: () => this.openGuildProfileModal(guild)
                }),
                DiscordContextMenu.buildMenuItem({
                    type: 'separator'
                })
            );
        });
    }

    handleUserSettingsChange = async () => {
        await i18n.loadPromise;
        this.loadLocale();
    }

    loadLocale() {
        Object.assign(i18n._proxyContext.messages, locales[UserSettingsStore.locale]);
        Object.assign(i18n._proxyContext.defaultMessages, locales['en-US']);
    }

    openGuildProfileModal(guild) {
        ModalStack.push(() => <GuildProfileModal guild={guild} />);
    }
}
