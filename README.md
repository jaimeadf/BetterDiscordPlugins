# BetterDiscordPlugins
[![Marmota's Basement](https://discordapp.com/api/guilds/514185816315265068/widget.png)](https://discord.gg/z6Yx9A8VDR)
[![release](https://github.com/jaimeadf/BetterDiscordPlugins/actions/workflows/release.yml/badge.svg)](https://github.com/jaimeadf/BetterDiscordPlugins/actions/workflows/release.yml)

## Overview

This repository contains a collection of plugins for the [@BetterDiscord](https://github.com/BetterDiscord) client modification, you can use the shortcuts below to download and see more details about each one:
- [BiggerStreamPreview](/src/BiggerStreamPreview)
- [WhoReacted](/src/WhoReacted)
- [SecretRingTone](/src/SecretRingTone)
- [GuildProfile](/src/GuildProfile)

> If you have any questions, feel free to message me on discord.

## Development

This section is designed for people who are willing to contribute or want to modify the source code for personal use. Here you can find all the information for developing and building locally.

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/)

### Scripts

#### `yarn dev`

Watches for any editions and automatically builds the plugins directly to your plugins folder.

#### `yarn build`

Builds the plugins for distribution.

#### `yarn lint`
Lints your changes using [ESLint](https://eslint.org/).

#### `yarn lint:fix`
Same as above but tries to fix any problems.

### First steps

> Run these commands using any command line tool of your choice.

1. Clone the repository and navigate to its directory.
```ps
git clone https://github.com/jaimeadf/BetterDiscordPlugins && cd BetterDiscordPlugins
```

2. Install the dependencies.
```ps
yarn install
```

3. Run the `dev` script.
```ps
yarn dev
```

4. Happy coding.

### Contributing

All contributions are welcome, whether they're a bug fix or a new feature. Only make sure to target the [develop](https://github.com/jaimeadf/BetterDiscordPlugins/tree/develop) branch and don't commit your `dist` folder. [GitHub Actions](https://github.com/features/actions) takes care of the entire building process for us.
