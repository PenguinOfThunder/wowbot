import type { Logger } from "pino";
import type { BotCommand, BotEvent } from "../types";

export default ({
  logger,
  commands
}: {
  logger: Logger;
  commands: BotCommand[];
}): BotEvent<"interactionCreate"> => ({
  name: "interactionCreate",
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    try {
      const { commandName, user } = interaction;
      logger.info(
        `'%s' command used by '%s#%s' on guild '%s' (id: %s)`,
        commandName,
        user.username,
        user.discriminator,
        interaction.guild?.name ?? "",
        interaction.guildId ?? ""
      );
      const cmd = commands.find((c) => c.data.name === commandName);
      if (cmd) {
        const childLogger = logger.child({
          commandName: commandName,
          userName: user.username,
          userDiscriminator: user.discriminator
        });
        await cmd.execute(interaction, childLogger);
      } else {
        logger.error(
          "Command '%s' was not found. Do you need to redeploy the commands?",
          commandName
        );
      }
    } catch (err) {
      logger.error(err, "An unexpected error occurred");
      if (!interaction.replied) {
        await interaction.reply({
          content: "Oof. Something went wrong. Try again later.",
          ephemeral: true
        });
      }
    } finally {
      logger.flush();
    }
  }
});
