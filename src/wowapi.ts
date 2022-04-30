import fetch from "node-fetch";

const wowApiUrl = "https://owen-wilson-wow-api.herokuapp.com/wows";

export type Wow = {
  movie: string;
  year: number;
  release_date: string;
  director: string;
  character: string;
  full_line: string;
  timestamp: string;
  current_wow_in_movie: number;
  total_wows_in_movie: number;
  poster: string;
  video: {
    "1080p"?: string;
    "760p"?: string;
    "480p"?: string;
    "360p"?: string;
  };
  audio: string;
};

export type WowApiResponse = Wow[];

export async function getRandom(): Promise<WowApiResponse> {
  return fetch(`${wowApiUrl}/random`)
    .then((r) => r.json())
    .then((j) => j as WowApiResponse);
}
