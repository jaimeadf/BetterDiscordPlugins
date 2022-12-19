# BetterDiscordPlugins
A collection of plugins for the [BetterDiscord](https://betterdiscord.app) client modification written by me with a lot of ☕.

## [BiggerStreamPreview](packages/BiggerStreamPreview)
View bigger stream previews via the context menu.

# Development
This project uses [lerna](https://lerna.js.org) and [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces) to divide each plugin into its own isolated container inside the `packages` folder.

## Getting started
### Prerequisites
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

### Setup
```sh
# 1. Clone the repository and navigate to its directory:
git clone https://github.com/jaimeadf/BetterDiscordPlugins && cd BetterDiscordPlugins

# 2. Install the dependencies:
yarn install

# 3. Run the `watch:dev` script:
yarn watch:dev

# Now, you may edit any plugin and see the changes take effect in real time.
# Happy coding 🎉!
```

## Scripts
> Note: These scripts may be run for all plugins simultaneously from the project's root or independently from the plugin's directory.

- `yarn build`: Builds the plugins for distribution.
- `yarn build:dev`: Builds the plugins directly into your plugins folder.
- `yarn watch:dev`: Watches for any changes and automatically builds the plugins directly into your plugins folder.
