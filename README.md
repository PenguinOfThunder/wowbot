# Wowbot

Owen Wilson "Wow" Discord Bot.

Inspired by and powered by the [Owen Wilson Wow API](https://owen-wilson-wow-api.herokuapp.com/) (as seen on [HackerNews](https://news.ycombinator.com/item?id=31209924)).

The bot was built by following the [Discord.js guide](https://discordjs.guide/#before-you-begin) and adapting it for Typescript.

Made for the fun of it and to learn more about writing Discord bots!

## Invite

Use this link to invite the bot to your server:
https://discord.com/api/oauth2/authorize?client_id=969754455820091422&permissions=0&scope=applications.commands%20bot

## Usage

After inviting the bot to your server, just use the `/wow` command.

### Commands and parameters

| Command      | Parameters        | Description                               |
| ------------ | ----------------- | ----------------------------------------- |
| `/wow`       | None              | Return a single random wow                |
|              | `director:`       | Pick from movies by a specific director   |
|              | `movie:`          | Pick from a specific movie                |
|              | `occurrence:`     | The number of the occurrence in the movie |
|              | `results:`        | Number of wows to return                  |
|              | `year:`           | Pick from a specific year                 |
|              | `sort_field:`     | Which to sort by                          |
|              | `sort_direction:` | Which direction (asc/desc) to sort in     |
| `/directors` | None              | Show a list of movie directors            |
| `/movies`    | None              | Show a list of the movies                 |

### Usage Examples

`/wow`

Returns a single random 'wow' by Owen Wilson

`/wow year:1996`

Returns a single random 'wow' from a 1996 movie

## Response

A response from this bot looks approximately something like this:

---

> Wow, getting a nice preview of what marriage is gonna be like with Ike Turner here.
>
> ― Owen Wilson as _John Beckwith_ in "Wedding Crashers" (2005) directed by David Dobkin (01:58:50, #6 of 6 wows in the movie)

https://videos.ctfassets.net/bs8ntwkklfua/6bPOrhYfZOA0D8AWms52Ry/687d879a6ff35bcd446a771b011a6882/Wedding_Crashers_Wow_6_1080p.mp4

---

(Discord will usually display a playable inline preview of the video below the message.)

## Data Source

This bot gets data from the [Owen Wilson Wow API](https://owen-wilson-wow-api.herokuapp.com/) by Avi Mamenko. All credit for this goes to him. I just created the bot part.

## Development

See [Development](docs/development.md)

# License

This project is licensed under the [MIT license](LICENSE).

# Disclaimers

Wowbot is not affiliated, associated, or endorsed by Avraham (Avi) Mamenko or his collaborators.

Wowbot is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Owen Wilson, or any of his subsidiaries or affiliates. All motion pictures, products, and brands mentioned on this website are the respective trademarks and copyrights of their owners.
