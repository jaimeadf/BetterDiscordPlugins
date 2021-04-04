# BetterDiscordPlugins
[![Marmota's Basement](https://discordapp.com/api/guilds/514185816315265068/widget.png)](https://discord.gg/z6Yx9A8VDR)
[![build](https://github.com/jaimeadf/BetterDiscordPlugins/actions/workflows/build.yml/badge.svg)](https://github.com/jaimeadf/BetterDiscordPlugins/actions/workflows/build.yml)

## Overview

This repository contains a collection of plugins for the [@BetterDiscord](https://github.com/BetterDiscord) client modification, you can use the shortcuts below to download and see more details about each one:
- [BiggerStreamPreview](/src/BiggerStreamPreview)
- [WhoReacted](/src/WhoReacted)

> If you have any questions, feel free to message me on discord.

## Development

This section is designed for people who are willing to contribute or modify the source code for personal use. Here you can find all the information for developing and building locally.

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/)

### Scripts

#### `yarn dev`

Watches for any editions and automatically builds the plugins in development mode directly to your plugins folder.

#### `yarn build`

Builds the plugins for distribution.

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

### Contributing

Please always submit pull requests to the [develop](https://github.com/jaimeadf/BetterDiscordPlugins/tree/develop) branch and be careful to never commit your dist folder, our [GitHub Actions](https://github.com/features/actions) is set up to automatically run the `build` script when any change is merged.
