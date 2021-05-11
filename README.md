<h1 align="center">BetterDiscordPlugins</h1>
<p align="center">A collection of plugins for the <a href="https://github.com/BetterDiscord">@BetterDiscord</a> client modification.</p>
<p align="center">
    <a href="https://discord.gg/z6Yx9A8VDR"><img src="https://discordapp.com/api/guilds/514185816315265068/widget.png"/></a>
    <a href="https://discord.gg/z6Yx9A8VDR"><img src="https://github.com/jaimeadf/BetterDiscordPlugins/actions/workflows/release.yml/badge.svg"/></a>
</p>

# Overview

<h2>
    BiggerStreamPreview
    <sub>
        <sup>(<a href="https://betterdiscord.app/Download?id=137">download</a> | <a href="/src/BiggerStreamPreview">more details</a>)</sup>
    </sub>
</h2>

Allows you see to see bigger previews of streams via the context menu.

<h2>
    WhoReacted
    <sub>
        <sup>(<a href="https://betterdiscord.app/Download?id=138">download</a> | <a href="/src/WhoReacted">more details</a>)</sup>
    </sub>
</h2>

Shows the avatars of the users who reacted to a message.

<h2>
    SecretRingTone
    <sub>
        <sup>(<a href="https://betterdiscord.app/Download?id=139">download</a> | <a href="/src/SecretRingTone">more details</a>)</sup>
    </sub>
</h2>

Makes the discord Easter Egg ringtone the default one.

<h2>
    GuildProfile
    <sub>
        <sup>(<a href="https://betterdiscord.app/Download?id=220">download</a> | <a href="/src/GuildProfile">more details</a>)</sup>
    </sub>
</h2>

Adds a modal that can be opened via any guild menu and contains various information about the guild, such as its owner, creation date, joined date, your friends and blocked users who are in it, and much more.

# Development

This section is designed for people who are willing to contribute or want to modify the source code for personal use. Here you can find all the information for developing and building locally.


## Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/)

## Scripts

#### `yarn dev`

Watches for any changes and automatically builds the plugins directly to your plugins folder.

#### `yarn build`

Builds the plugins for distribution.

#### `yarn lint`
Lints your changes using [ESLint](https://eslint.org/).

#### `yarn lint:fix`
Same as above but also tries to fix any problems.

## Getting started

> Run these commands using any command line tool of your choice.

```bash
# Clone the repository and navigate to its directory.
git clone https://github.com/jaimeadf/BetterDiscordPlugins && cd BetterDiscordPlugins

# Install all dependencies.
yarn install

# Run the dev script.
yarn dev

# Happy coding 🎉!
```

## Contributing

All contributions are welcome, whether they're a bug fix, a new feature, or even just a typo correction. Only make sure to always target the [develop](https://github.com/jaimeadf/BetterDiscordPlugins/tree/develop) branch and don't commit your `dist` folder, [GitHub Actions](https://github.com/features/actions) takes care of the entire building process for us.
