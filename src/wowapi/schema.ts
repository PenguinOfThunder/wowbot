/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/random": {
    /** Retrieve a random "wow" in JSON format. */
    get: operations["random"];
  };
  "/ordered/{index}": {
    /** Retrieve "wow" results by their index in the chronological order of all results. */
    get: operations["ordered"];
  };
  "/movies": {
    /** Retrieve all names of movies in which Owen Wilson says "wow." */
    get: operations["movies"];
  };
  "/directors": {
    /** Retrieve all directors of movies in which Owen Wilson says "wow." */
    get: operations["directors"];
  };
}

export interface components {
  schemas: {
    Wow: {
      /** @example Midnight in Paris */
      movie?: string;
      /** @example 2011 */
      year?: number;
      /**
       * Format: date
       * @example 2011-05-20T00:00:00.000Z
       */
      release_date?: string;
      /** @example Woody Allen */
      director?: string;
      /** @example Gil Pender */
      character?: string;
      /** @example 01:33:57 */
      movie_duration?: string;
      /** @example 00:58:22 */
      timestamp?: string;
      /** @example Wow. */
      full_line?: string;
      /** @example 5 */
      current_wow_in_movie?: number;
      /** @example 10 */
      total_wows_in_movie?: number;
      /** @example https://images.ctfassets.net/bs8ntwkklfua/2ZcfSCe2dlfoVzYMr4b9nK/d566e5ad044dee56645f3bffc7200d64/Midnight_in_Paris_Poster.jpg */
      poster?: string;
      video?: {
        /** @example https://videos.ctfassets.net/bs8ntwkklfua/1DSaYjQ8SnL1Imeuxe0eXE/100d3106c8a0bf5e80372e2187daf325/Midnight_in_Paris_Wow_5_1080p.mp4 */
        "1080p"?: string;
        /** @example https://videos.ctfassets.net/bs8ntwkklfua/eFI1n7voe4CsxkWEWv2q0/36781ed8f50e508e8e1f79c8e65e601a/Midnight_in_Paris_Wow_5_720p.mp4 */
        "720p"?: string;
        /** @example https://videos.ctfassets.net/bs8ntwkklfua/6oSaIzfy7k3DJMvvy3j1kN/d77192d7decb3ba9d06a5210a58df1fa/Midnight_in_Paris_Wow_5_480p.mp4 */
        "480p"?: string;
        /** @example https://videos.ctfassets.net/bs8ntwkklfua/4LQ4lkhx41XDC6UcMlmjbA/dfd5e3604c85c9fb9d38ea2dfdd02a2f/Midnight_in_Paris_Wow_5_360p.mp4 */
        "360p"?: string;
      };
      /** @example https://assets.ctfassets.net/bs8ntwkklfua/2A5G34x8JCQBuYwU4D2l9S/27cc467b3ff5796ff1bbe113a06a6e64/Midnight_in_Paris_Wow_5.mp3 */
      audio?: string;
    };
    Wows: components["schemas"]["Wow"][];
  };
}

export interface operations {
  /** Retrieve a random "wow" in JSON format. */
  random: {
    parameters: {
      query: {
        /** Retrieve a specific number of random "wow" results. */
        results?: number;
        /** Retrieve a random "wow" from a specific year. */
        year?: number;
        /** Retrieve a random "wow" by the name of the movie it appears in. */
        movie?: string;
        /** Retrieve a random "wow" from a movie with a particular director. */
        director?: string;
        /** Retrieve a random "wow" by the number of its occurrence in a movie. */
        wow_in_movie?: number;
        /** Sort multiple random results by either movie, release_date, year, director, or number_current_wow. */
        sort?:
          | "movie"
          | "release_date"
          | "year"
          | "director"
          | "number_current_wow";
        /** Sort direction can be either asc (ascending) or desc (descending). */
        direction?: "asc" | "desc";
      };
    };
    responses: {
      /** An array of movies */
      200: {
        content: {
          "application/json": components["schemas"]["Wows"];
        };
      };
    };
  };
  /** Retrieve "wow" results by their index in the chronological order of all results. */
  ordered: {
    parameters: {
      path: {
        /** Index within results array. Either a single index or a range. Range is between a first index and a second index, inclusive. */
        index: string;
      };
    };
    responses: {
      /** Either a single movie or an array of movies */
      200: {
        content: {
          "application/json":
            | components["schemas"]["Wow"]
            | components["schemas"]["Wows"];
        };
      };
      /** Bad Request */
      400: {
        content: {
          "text/html": string;
        };
      };
    };
  };
  /** Retrieve all names of movies in which Owen Wilson says "wow." */
  movies: {
    responses: {
      /** An array of movies */
      200: {
        content: {
          "application/json": string[];
        };
      };
    };
  };
  /** Retrieve all directors of movies in which Owen Wilson says "wow." */
  directors: {
    responses: {
      /** An array of directors */
      200: {
        content: {
          "application/json": string[];
        };
      };
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface external {}
