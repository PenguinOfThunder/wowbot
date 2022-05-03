import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import "dotenv/config";
import { commands } from "./commands";
import type { Config } from "./global";

/***
 * This script only needs to run once, or anytime new commands or options are added.
 ***/

const {
  DISCORD_CLIENT_ID: clientId,
  DISCORD_GUILD_ID: guildId,
  DISCORD_TOKEN: token
} = process.env as Config;

const commandsToDeploy =
  process.argv[2] === "undeploy"
    ? []
    : commands.map((cmd) => cmd.data).map((command) => command.toJSON());

console.log("Commands to deploy:");
console.dir(commands, {
  depth: 5
});

const rest = new REST({ version: "9" }).setToken(token);

if (clientId) {
  if (guildId) {
    // If guild id is specified, only register commands for that guild
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandsToDeploy
      })
      .then(() =>
        console.log("Successfully registered guild application commands.")
      )
      .catch(console.error);
  } else {
    // Otherwise, register globally
    console.log("No DISCORD_GUILD_ID, deploying globally");
    rest
      .put(Routes.applicationCommands(clientId), { body: commandsToDeploy })
      .then(() =>
        console.log("Successfully registered global application commands.")
      )
      .catch(console.error);
  }
} else {
  throw new Error("Missing DISCORD_CLIENT_ID");
}
