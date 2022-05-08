// A unit wow
export type Wow = {
  movie: string;
  year: number;
  release_date: string;
  director: string;
  character: string;
  full_line: string;
  timestamp: string;
  movie_duration: string;
  current_wow_in_movie: number;
  total_wows_in_movie: number;
  poster: string;
  video: {
    "1080p"?: string;
    "720p"?: string;
    "480p"?: string;
    "360p"?: string;
  };
  audio: string;
};
