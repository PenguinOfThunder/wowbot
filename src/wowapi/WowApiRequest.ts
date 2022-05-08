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
