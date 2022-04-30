import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import "dotenv/config";
import type { Config } from "./global";

const {
  DISCORD_CLIENT_ID: clientId,
  DISCORD_GUILD_ID: guildId,
  DISCORD_TOKEN: token,
} = process.env as Config;

const commands =
  process.argv[2] === "undeploy"
    ? []
    : [
        new SlashCommandBuilder()
          .setName("wow")
          .setDescription("Replies with wow!"),
      ].map((command) => command.toJSON());

console.log("Commands deployed");
console.log(commands);

const rest = new REST({ version: "9" }).setToken(token);

if (clientId) {
  if (guildId) {
    // If guild id is specified, only register commands for that guild
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() =>
        console.log("Successfully registered guild application commands.")
      )
      .catch(console.error);
  } else {
    // Otherwise, register globally
    rest
      .put(Routes.applicationCommands(clientId), { body: commands })
      .then(() =>
        console.log("Successfully registered global application commands.")
      )
      .catch(console.error);
  }
}
