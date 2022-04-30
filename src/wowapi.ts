import fetch from "node-fetch";

// Base URL to API for https://owen-wilson-wow-api.herokuapp.com/
const wowApiUrl = "https://owen-wilson-wow-api.herokuapp.com/wows";

// A unit wow
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

// A response can have one or more wows
export type WowApiResponse = Wow[];

// Options we are allowed to pass in to the API as query parameters
export type WowApiRequest = {
  results?: number;
  year?: number;
  movie?: string;
  director?: string;
  wow_in_movie?: number;
  sort?: "movie" | "release_date" | "year" | "director" | "number_current_wow";
  direction?: "asc" | "desc";
};

export async function getDirectors(): Promise<string[]> {
  return fetch(`${wowApiUrl}/directors`)
    .then((r) => r.json())
    .then((j) => j as string[]);
}

export async function getMovies(): Promise<string[]> {
  return fetch(`${wowApiUrl}/movies`)
    .then((r) => r.json())
    .then((j) => j as string[]);
}

export async function getRandom(
  opt: WowApiRequest = {}
): Promise<WowApiResponse> {
  const urlWithParms = new URL(`${wowApiUrl}/random`);

  if (opt.year) {
    urlWithParms.searchParams.set("year", opt.year.toFixed(0));
  }
  if (opt.director) {
    urlWithParms.searchParams.set("director", opt.director);
  }
  if (opt.movie) {
    urlWithParms.searchParams.set("movie", opt.movie);
  }
  if (opt.results > 0) {
    urlWithParms.searchParams.set("results", opt.results.toFixed(0));
  }
  if (opt.wow_in_movie > 0) {
    urlWithParms.searchParams.set("wow_in_movie", opt.wow_in_movie.toFixed(0));
  }
  if (opt.sort) {
    urlWithParms.searchParams.set("sort", opt.sort);
  }
  if (opt.direction) {
    urlWithParms.searchParams.set("sort", opt.direction);
  }
  return fetch(urlWithParms.href)
    .then((r) => r.json())
    .then((j) => j as WowApiResponse);
}
