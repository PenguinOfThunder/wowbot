# Wowbot

Owen Wilson "Wow" Discord Bot.

## Invite

Use this link to invite the bot to your server:
https://discord.com/api/oauth2/authorize?client_id=969754455820091422&permissions=0&scope=applications.commands%20bot

## Usage

After inviting the bot to your server, just use the `/wow` command.

### Commands and parameters

| Command      | Parameters    | Description                               |
|--------------|---------------|-------------------------------------------|
| `/wow`       | None          | Return a single random wow                |
|              | `director:`   | Pick from movies by a specific director   |
|              | `movie:`      | Pick from a specific movie                |
|              | `occurrence:` | The number of the occurrence in the movie |
|              | `results:`    | Number of wows to return                  |
|              | `year:`       | Pick from a specific year                 |
| `/directors` | None          | Show a list of movie directors            |
| `/movies`    | None          | Show a list of the movies                 |

### Examples

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

