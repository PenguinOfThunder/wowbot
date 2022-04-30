import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId, token } from "./config.json";

const commands = [
  // new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  // new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  // new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName("wow").setDescription("Replies with wow!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

if (clientId) {
  if (guildId) {
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() =>
        console.log("Successfully registered guild application commands.")
      )
      .catch(console.error);
  }

  rest
    .put(Routes.applicationCommands(clientId), { body: commands })
    .then(() =>
      console.log("Successfully registered global application commands.")
    )
    .catch(console.error);
}
