# Wowbot

Owen Wilson "Wow" Discord Bot.

## Invite

Use this link to invite the bot to your server:
https://discord.com/api/oauth2/authorize?client_id=969754455820091422&permissions=0&scope=applications.commands%20bot

## Usage

After inviting the bot to your server, just use the `/wow` command.

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

## To-do

Add parameters to /wow command to allow more control of the response:

- results = _number_ - return a given number of random wows
- year _number_ - return wows from a specific year
- movie _string_ - return wows from a specific movie
- director _string_ - return wows from movies with a particular director.
- occurrence _number_ - return a wow by the number of its occurrence in the movie

Add more commands:

- /movies - return a list of all movies with wows
- /directors - return a list of all directors
