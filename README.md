# Wowbot

Owen Wilson "Wow" Discord Bot.

Inspired by and powered by the [Owen Wilson Wow API](https://owen-wilson-wow-api.herokuapp.com/) (as seen on [HackerNews](https://news.ycombinator.com/item?id=31209924)).

The bot was built by following the [Discord.js guide](https://discordjs.guide/#before-you-begin) and adapting it for Typescript.

Made for the fun of it and to learn more about writing Discord bots!

## Invite

Use [this link](https://discord.com/api/oauth2/authorize?client_id=969754455820091422&permissions=0&scope=applications.commands%20bot) to invite the bot to your server. That instance is my test version. It is running inside Docker on a Raspberry Pi 4, and it may be down while I'm using it for testing.

I have not tested it, but it should be simple enough to host on something like Heroku.

## Usage

After inviting the bot to your server, just use the `/wow` command.

To summon the bot to your voice channel, use the `/wowv` command (as in wow-voice, or like wow-vee).

### Commands and parameters

| Command      | Parameters         | Description                                                      |
| ------------ | ------------------ | ---------------------------------------------------------------- |
| `/wow`       | None               | Return a single random wow                                       |
|              | `director:`        | Pick from movies by a specific director                          |
|              | `movie:`           | Pick from a specific movie                                       |
|              | `occurrence:`      | The number of the occurrence in the movie                        |
|              | `results:`         | Number of wows to return                                         |
|              | `year:`            | Pick from a specific year                                        |
|              | `sort_field:`      | Which to sort by                                                 |
|              | `sort_direction:`  | Which direction (asc/desc) to sort in                            |
| `/wowv`      | None               | Visit the voice channel user is in, play audio clip, then leave. |
|              | Same as for `/wow` |                                                                  |
| `/directors` | None               | Show a list of movie directors                                   |
| `/movies`    | None               | Show a list of the movies                                        |

### Usage Examples

`/wow`

Returns a single random 'wow' by Owen Wilson

`/wow year:1996`

Returns a single random 'wow' from a 1996 movie

## Response

### Text Response

A text response from this bot looks approximately something like this:

---

> Wow, getting a nice preview of what marriage is gonna be like with Ike Turner here.
>
> ― Owen Wilson as _John Beckwith_ in "Wedding Crashers" (2005) directed by David Dobkin (01:58:50, #6 of 6 wows in the movie)

https://videos.ctfassets.net/bs8ntwkklfua/6bPOrhYfZOA0D8AWms52Ry/687d879a6ff35bcd446a771b011a6882/Wedding_Crashers_Wow_6_1080p.mp4

---

(Discord will usually display a playable inline preview of the video below the message.)

### Voice Response

In response to the `/wowv` command, the bot will pick a random 'wow' just like for `/wow`, but instead of replying by text message to the channel from which the user used the command, it will join the voice channel to which the user is connected on that server. Then it will play back the corresponding audio clip(s) and leave.

A maximum of 10 clips can be played back at one time. This is in order to avoid people launching "DDoS" attacks on a channel with the bot.

## Data Source

This bot gets data from the [Owen Wilson Wow API](https://owen-wilson-wow-api.herokuapp.com/) by Avi Mamenko. All credit for this goes to him. I just created the bot part.

## Permissions

This bot does not need permissions beyond the "bot" and "command" permissions. It does not monitor channels for text or listen to audio. It only responds to [slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ) (a relatively new feature from Discord).

And since this is open source, you are always free to clone this project, inspect the code, and run your own copy.

## Development

See [Development](docs/development.md)

## License

This project is licensed under the [MIT license](LICENSE).

## Disclaimers

Wowbot is not affiliated, associated, or endorsed by Avraham (Avi) Mamenko or his collaborators.

Wowbot is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Owen Wilson, or any of his subsidiaries or affiliates. All motion pictures, products, and brands mentioned on this website are the respective trademarks and copyrights of their owners.
