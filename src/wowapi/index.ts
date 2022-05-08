import fetch from "node-fetch";
import { WowApiError } from "./WowApiError";
import { WowApiRequest } from "./WowApiRequest";
import { WowApiResponse } from "./WowApiResponse";
import { WowDirectorsResponse } from "./WowDirectorsResponse";
import { WowMoviesResponse } from "./WowMoviesResponse";

// Base URL to API for https://owen-wilson-wow-api.herokuapp.com/
const wowApiUrl = "https://owen-wilson-wow-api.herokuapp.com/wows";

/**
 * Get a list of known director names
 * @returns A list of director names
 * @throws {WowApiError} if a fetch error occurs.
 */
export async function getDirectors(): Promise<WowDirectorsResponse> {
  const r = await fetch(`${wowApiUrl}/directors`);
  if (!r.ok) throw new WowApiError("Fetching directors failed", r);
  const j = (await r.json()) as WowDirectorsResponse;
  return j;
}

/**
 * Get a list of known movie titles
 * @returns a list of movie titles
 * @throws {WowApiError} if a fetch error occurs.
 */
export async function getMovies(): Promise<WowMoviesResponse> {
  const r = await fetch(`${wowApiUrl}/movies`);
  if (!r.ok) throw new WowApiError("Fetching movies failed", r);
  const j = (await r.json()) as WowMoviesResponse;
  return j;
}

/**
 * Get a list of random wows from the API
 * @param opt request options
 * @returns one or more random wows
 * @throws {WowApiError} if a fetch error occurs.
 */
export async function getRandom(
  opt: WowApiRequest = {}
): Promise<WowApiResponse> {
  const urlWithParams = new URL(`${wowApiUrl}/random`);

  if (opt.year) {
    urlWithParams.searchParams.set("year", opt.year.toFixed(0));
  }
  if (opt.director) {
    urlWithParams.searchParams.set("director", opt.director);
  }
  if (opt.movie) {
    urlWithParams.searchParams.set("movie", opt.movie);
  }
  if (opt.results !== undefined && opt.results > 0) {
    urlWithParams.searchParams.set("results", opt.results.toFixed(0));
  }
  if (opt.wow_in_movie !== undefined && opt.wow_in_movie > 0) {
    urlWithParams.searchParams.set(
      "wow_in_movie",
      opt.wow_in_movie?.toFixed(0)
    );
  }
  if (opt.sort) {
    urlWithParams.searchParams.set("sort", opt.sort);
  }
  if (opt.direction) {
    urlWithParams.searchParams.set("sort", opt.direction);
  }
  const r = await fetch(urlWithParams.href);
  // Throw on HTTP error
  if (!r.ok) throw new WowApiError("Fetching random failed", r);

  // Assert that it is a Wow API response
  const j: WowApiResponse = (await r.json()) as WowApiResponse;
  return j;
}

// re-export
export * from "./Wow";
export * from "./WowApiError";
export * from "./WowApiRequest";
export * from "./WowApiResponse";
export * from "./WowDirectorsResponse";
export * from "./WowMoviesResponse";
