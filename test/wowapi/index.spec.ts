import assert from "assert";
import * as wowapi from "../../src/wowapi/index";
import type {
  WowMoviesResponse,
  WowDirectorsResponse,
  WowApiResponse
} from "../../src/wowapi/index";

describe("wowapi.getMovies", () => {
  it("Fetches a list of movies", async () => {
    const movies: WowMoviesResponse = await wowapi.getMovies();
    // console.debug(movies);

    assert(Array.isArray(movies), "Returns an array");
    assert(movies.length > 0, "Returns at least one movie");
    assert(typeof movies[0] === "string", "First entry is a string");
  });
});

describe("wowapi.getDirectors", () => {
  it("Fetches a list of directors", async () => {
    const directors: WowDirectorsResponse = await wowapi.getDirectors();
    // console.debug(directors);
    assert(Array.isArray(directors), "Returns an array");
    assert(directors.length > 0, "Returns at least one director");
    assert(typeof directors[0] === "string", "First entry is a string");
  });
});

describe("wowapi.getRandom", () => {
  it("Fetches a random movie", async () => {
    const movies: WowApiResponse = await wowapi.getRandom({
      year: 2004,
      movie: "Starsky & Hutch",
      wow_in_movie: 1
    });
    // console.debug(movies);
    assert(Array.isArray(movies), "Returns an array");
    assert(movies.length > 0, "Returns at least one movie");
    const movie = movies[0];
    assert.equal(movie.movie, "Starsky & Hutch", "Movie name matches");
    assert.equal(movie.year, 2004, "Movie year matches");
    assert.equal(movie.current_wow_in_movie, 1, "Wow # matches");
    assert.equal(movie.release_date, "2004-03-05", "Release date matches");
  });
});
