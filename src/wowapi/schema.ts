/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/random": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Random "Wow"
         * @description Retrieve a random "wow" in JSON format.
         */
        get: operations["random"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ordered/{index}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Ordered "Wow"
         * @description Retrieve "wow" results by their index in the chronological order of all results.
         */
        get: operations["ordered"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/movies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * All Movies
         * @description Retrieve all names of movies in which Owen Wilson says "wow."
         */
        get: operations["movies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/directors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * All Directors
         * @description Retrieve all directors of movies in which Owen Wilson says "wow."
         */
        get: operations["directors"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Wow: {
            /** @example Midnight in Paris */
            movie?: string;
            /** @example 2011 */
            year?: number;
            /**
             * Format: date
             * @example 2011-05-20
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
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    random: {
        parameters: {
            query?: {
                /**
                 * @description Retrieve a specific number of random "wow" results.
                 * @example 5
                 */
                results?: number;
                /**
                 * @description Retrieve a random "wow" from a specific year.
                 * @example 2011
                 */
                year?: number;
                /**
                 * @description Retrieve a random "wow" by the name of the movie it appears in.
                 * @example zoolander
                 */
                movie?: string;
                /**
                 * @description Retrieve a random "wow" from a movie with a particular director.
                 * @example wes anderson
                 */
                director?: string;
                /**
                 * @description Retrieve a random "wow" by the number of its occurrence in a movie.
                 * @example 2
                 */
                wow_in_movie?: number;
                /**
                 * @description Sort multiple random results by either movie, release_date, year, director, or number_current_wow.
                 * @example movie
                 */
                sort?: "movie" | "release_date" | "year" | "director" | "number_current_wow";
                /**
                 * @description Sort direction can be either asc (ascending) or desc (descending).
                 * @example asc
                 */
                direction?: "asc" | "desc";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An array of movies */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Wows"];
                };
            };
        };
    };
    ordered: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Index within results array. Either a single index or a range. Range is between a first index and a second index, inclusive. */
                index: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Either a single movie or an array of movies */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Wow"] | components["schemas"]["Wows"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/html": string;
                };
            };
        };
    };
    movies: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An array of movies */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
        };
    };
    directors: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An array of directors */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
        };
    };
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface external {}
