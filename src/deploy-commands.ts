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
        // /wow command
        new SlashCommandBuilder()
          .setName("wow")
          .setDescription("Replies with wow!")
          .addStringOption((option) =>
            option
              .setName("director")
              .setDescription("Pick from movies by a specific director")
          )
          .addStringOption((option) =>
            option.setName("movie").setDescription("Pick from a specific movie")
          )
          .addIntegerOption((option) =>
            option
              .setName("occurrence")
              .setDescription("The number of the occurrence in the movie")
              .setMinValue(1)
              .setMaxValue(10)
          )
          .addIntegerOption((option) =>
            option
              .setName("results")
              .setDescription("Number of wows to return")
              .setMinValue(1)
              .setMaxValue(100)
          )
          .addIntegerOption((option) =>
            option
              .setName("year")
              .setDescription("Pick from a specific year")
              .setMinValue(1996)
          ),
        // /movies command
        new SlashCommandBuilder()
          .setName("movies")
          .setDescription("Return a list of movies with wows"),
        // /directors command
        new SlashCommandBuilder()
          .setName("directors")
          .setDescription(
            "Return a list of directors who made movies with wows"
          ),
      ].map((command) => command.toJSON());

console.log("Commands deployed");
console.dir(commands, {
  depth: 5,
});

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
