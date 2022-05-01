import assert from "assert";
import { wowToMarkdown } from "../src/commands/wow";
import { Wow } from "../src/wowapi";

describe("wowToMarkdown", () => {
  const wow: Wow = {
    movie: "The Haunting",
    year: 1999,
    release_date: "1999-07-23",
    director: "Jan de Bont",
    character: "Luke Sanderson",
    movie_duration: "01:52:37",
    timestamp: "00:47:26",
    full_line: "Yeah, no kidding. Did you see what she had on yesterday? Wow.",
    current_wow_in_movie: 5,
    total_wows_in_movie: 5,
    poster:
      "https://images.ctfassets.net/bs8ntwkklfua/6Zu7ux0JYrUWk0UC8vxPtj/d0da8bfbad670655779a9921ac514759/The_Haunting_Poster.jpg",
    video: {
      "1080p":
        "https://videos.ctfassets.net/bs8ntwkklfua/5V9kXvppEhk94nRMnOriQQ/644d5e03b50e7caea24e29b69c5877d5/The_Haunting_Wow_5_1080p.mp4",
      "720p":
        "https://videos.ctfassets.net/bs8ntwkklfua/2PUQHii6BCgBc8DEQXNFf/606a9f0416c61f32cf7f73a0b03905b5/The_Haunting_Wow_5_720p.mp4",
      "480p":
        "https://videos.ctfassets.net/bs8ntwkklfua/5PkqPsQJf6QMIiot8TlU2B/5528db99aef97942910c5686d57be2b0/The_Haunting_Wow_5_480p.mp4",
      "360p":
        "https://videos.ctfassets.net/bs8ntwkklfua/6LaRV3jrg0cU2IxLpV2k5Y/572c8b8f066c0b9c79106074f91e53f8/The_Haunting_Wow_5_360p.mp4",
    },
    audio:
      "https://assets.ctfassets.net/bs8ntwkklfua/2NybZG8xOaIEKZ3hSPi3zg/48d17e1b4bdf836300b99618c8355f58/The_Haunting_Wow_5.mp3",
  };

  it("Should produce correct output", () => {
    assert.equal(
      wowToMarkdown(wow),
      "> Yeah, no kidding. Did you see what she had on yesterday? Wow.\n" +
        "> \n" +
        '> ― Owen Wilson as *Luke Sanderson* in "The Haunting" (1999) directed by Jan de Bont (00:47:26, #5 of 5 wows in the movie)\n' +
        "https://videos.ctfassets.net/bs8ntwkklfua/5V9kXvppEhk94nRMnOriQQ/644d5e03b50e7caea24e29b69c5877d5/The_Haunting_Wow_5_1080p.mp4"
    );
  });
});
