import fetch from "node-fetch";
import * as schema from "./schema";
import { WowApiError } from "./WowApiError";

// re-export API types
export type Wow = schema.components["schemas"]["Wow"];
export type Wows = schema.components["schemas"]["Wows"];
export type WowApiRequest = schema.operations["random"]["parameters"]["query"];
export type WowApiResponse =
  schema.operations["random"]["responses"]["200"]["content"]["application/json"];
export type WowDirectorsResponse =
  schema.operations["directors"]["responses"]["200"]["content"]["application/json"];
export type WowMoviesResponse =
  schema.operations["movies"]["responses"]["200"]["content"]["application/json"];
export * from "./WowApiError";

// API paths
const baseUrl = "https://owen-wilson-wow-api.herokuapp.com/wows";
const getDirectorsUrl = `${baseUrl}/directors`;
const getMoviesUrl = `${baseUrl}/movies`;
const getRandomUrl = `${baseUrl}/random`;

/**
 * Get a list of known director names
 * @returns A list of director names
 * @throws {WowApiError} if a fetch error occurs.
 */
export async function getDirectors(): Promise<WowDirectorsResponse> {
  const r = await fetch(getDirectorsUrl);
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
  const r = await fetch(getMoviesUrl);
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
  const urlWithParams = new URL(getRandomUrl);

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
