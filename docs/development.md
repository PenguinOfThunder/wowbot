# Development

To get started, clone this repository.

Then create a `.env` file based on the example in `.env.example` and place it in the project directory.

At a minimum you need the client id and token. Do _not_ check the `.env` file into git.

The guild id is required if you want to test commands on your own server.

Using your own guild for testing is recommended for development, since commands will update immediately, unlike global commands that can take up to an hour.

```sh
DISCORD_CLIENT_ID=client-id-here
DISCORD_TOKEN=token-here
```

You need to get a Discord token and client id from your [Discord developer account](https://discord.com/developers/applications).

Follow directions from Discord here to create a token as well as an invite link.

To get the Discord Guild ID, you need to find the guild id of your server. To do this you need to enable developer mode in Discord, which lets you copy the ID of things (servers, channels, messages) to the clipboard.

## Building

You can use npm scripts for everything:

### Build

```sh
npm run build
```

Compile the Typescript to Javascript. Outputs to the `dist` directory.

## Test

### Run tests

```sh
npm test
```

Run unit tests with mocha.

## Deploy and Run Application

### Run locally

```sh
npm start
```

Run the compiled JavaScript from `dist`. Recommended for testing. Run `npm run build` first.

### Build the Docker image

```sh
npm run dockerize
```

Builds the Docker container image. Customize in the `Dockerfile`.

### Run the Docker container

```sh
npm run container
```

Run the Docker container image that was built.

### Start the Docker service

```sh
npm run service-up
```

Runs `docker-compose service up`. Customize in the `docker-compose.yml` file.

### Stop the Docker service

```sh
npm run service-down
```

Runs `docker-compose service down` to shut down the service.

## Logging

The application will log to stdout only. To access the logs from Docker, use the `docker logs` command.

To make the logs more readable, use [pino-pretty](https://github.com/pinojs/pino-pretty), like this:

```bash
docker logs wowbot -f | npx pino-pretty -Sct
```

By default the application is set up with asynchronous logging, so the logs can be up to 10 seconds behind.

## Manage commands

### Deploy Discord commands

```sh
npm run deploy-commands
```

Deploy Discord commands. You only need to do this anytime you update the commands. This must be done at least once before the bot accept commands.

### Undeploy Discord commands

```sh
npm run undeploy-commands
```

Undeploy all commands. This is the same as deploying an empty list of commands.
