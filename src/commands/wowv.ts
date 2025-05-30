import { SlashCommandBuilder } from "@discordjs/builders";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  demuxProbe,
  DiscordGatewayAdapterCreator,
  entersState,
  getVoiceConnection,
  joinVoiceChannel,
  NoSubscriberBehavior,
  VoiceConnectionStatus
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import { Logger } from "pino";
import { getOptionValue } from "../lib/commandUtil";
import { fetchContent } from "../lib/urlCache";
import type { BotCommand } from "../types";
import type { WowApiRequest } from "../wowapi";
import { getRandom } from "../wowapi";

function getOrCreateConnection(
  guildId: string,
  channelId: string,
  voiceAdapterCreator: DiscordGatewayAdapterCreator,
  logger: Logger
) {
  let connection = getVoiceConnection(guildId);
  if (!connection) {
    connection = joinVoiceChannel({
      channelId,
      guildId: guildId,
      adapterCreator: voiceAdapterCreator,
      debug: logger.isLevelEnabled("debug")
    })
      .on("error", (err) => {
        logger.error(err, "Voice connection error");
      })
      .on("stateChange", (oldState, newState) => {
        logger.debug(
          "Voice connection changed state from %s to %s",
          oldState.status,
          newState.status
        );
      })
      .on("debug", (msg) => {
        logger.debug(msg, "Connection debug");
      });
  }
  return connection;
}

function createSoundPlayer(logger: Logger) {
  //   logger.debug("Creating audio player");
  return createAudioPlayer({
    debug: logger.isLevelEnabled("debug"),
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause
    }
  })
    .on("error", (err) => {
      logger.error(err, "Audio Player error");
    })
    .on("stateChange", (oldState, newState) => {
      logger.debug(
        "Player changed state from %s to %s",
        oldState.status,
        newState.status
      );
    })
    .on("debug", (msg) => {
      logger.debug(msg, "Player debug");
    });
}

const command: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("wowv")
    .setDescription("Joins your voice channel and delivers a wow!")
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
    .addIntegerOption(
      (option) =>
        option
          .setName("results")
          .setDescription("Number of wows to return")
          .setMinValue(1)
          .setMaxValue(10) // limit voice requests to at most 10 or it can get annoying
    )
    .addIntegerOption((option) =>
      option
        .setName("year")
        .setDescription("Pick from a specific year")
        .setMinValue(1996)
    )
    .addStringOption((option) =>
      option
        .setName("sort_field")
        .setDescription("order results by this field")
        .addChoices(
          { name: "Movie", value: "movie" },
          { name: "Release date", value: "release_date" },
          { name: "Year", value: "year" },
          { name: "Director", value: "director" },
          { name: "Occurrence", value: "number_current_wow" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("sort_direction")
        .setDescription("order results ascending or descending")
        .addChoices(
          { name: "Ascending", value: "asc" },
          { name: "Descending", value: "desc" }
        )
    ) as SlashCommandBuilder,
  execute: async function (interaction, logger) {
    const { member, options: opts } = interaction;
    if (!member) {
      logger.debug("User is probably using command from DM");
      await interaction.reply({
        content:
          "I'm sorry. I can't do that unless you're in a voice channel on a server I'm on",
        ephemeral: true
      });
      return;
    }
    const { voice } = member as GuildMember;
    const { channelId, channel, guild } = voice || {};
    if (!channel || !channelId) {
      logger.info("User is not in a voice channel");
      await interaction.reply({
        content: "You have to be in a voice channel before I can join you!",
        ephemeral: true
      });
      return;
    }
    const { id: guildId, name: guildName, voiceAdapterCreator } = guild;
    const { name: channelName } = channel;

    const requestParams: WowApiRequest = {
      director: getOptionValue(opts, "director"),
      movie: getOptionValue(opts, "movie"),
      year: getOptionValue(opts, "year"),
      results: getOptionValue(opts, "results"),
      wow_in_movie: getOptionValue(opts, "occurrence"),
      sort: (getOptionValue(opts, "sort_field") ||
        "year"),
      direction:
        getOptionValue(opts, "sort_direction") === "desc" ? "desc" : "asc"
    };
    logger.debug(requestParams, "Executing request for random voice wow");
    const wows = await getRandom(requestParams);
    if (!wows || wows.length === 0) {
      logger.debug("Found no results, informing user");
      await interaction.reply({
        content: "Sorry, I couldn't find anything that matched those criteria.",
        ephemeral: true
      });
      return;
    }
    // Join user's voice channel and play it there instead
    logger.debug(
      `Joining voice channel '${channelName}' on server '${guildName}' (#${guildId})`
    );
    ///-- let the user know we're on our way
    logger.debug("Replying to interaction");
    await interaction.reply({
      content: `I will join you in ${channelName}!`,
      ephemeral: true
    });

    // Get a connection
    const connection = getOrCreateConnection(
      guildId,
      channelId,
      voiceAdapterCreator,
      logger
    );
    try {
      logger.debug("Waiting for connection to be ready");
      await entersState(connection, VoiceConnectionStatus.Ready, 3000);

      const player = createSoundPlayer(logger);
      connection.subscribe(player);
      logger.debug("Playing each matching wow in turn (%d)", wows.length);
      for (const wow of wows) {
        if (wow.audio) {
          const audioStream = await fetchContent(wow.audio);
          const { stream, type } = await demuxProbe(audioStream);
          const clip = createAudioResource(stream, {
            inputType: type,
            inlineVolume: false,
            metadata: {
              audioUrl: wow.audio
            }
          });

          logger.debug(
            `Playing %s dur %s type %s`,
            wow.audio,
            clip.playbackDuration,
            type
          );
          player.play(clip);
          await entersState(player, AudioPlayerStatus.Playing, 5000); // At most play 5 seconds
          await Promise.race([
            entersState(player, AudioPlayerStatus.AutoPaused, 5000),
            entersState(player, AudioPlayerStatus.Idle, 5000)
          ]);
        } else {
          logger.debug("No audio clip found for that wow");
        }
      }
    } catch (err) {
      logger.error(err, "Voice wow error");
    } finally {
      connection.destroy();
    }
  }
};

export default command;
