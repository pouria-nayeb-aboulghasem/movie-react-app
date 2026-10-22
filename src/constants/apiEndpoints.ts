const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ENDPOINTS = {
  movies: "/discover/movie",
  moviesQuery: "/search/movie",
  genres: "/genre/movie/list",
  series: "/discover/tv",
  seriesQuery: "/search/tv",
  seriesPopular: "/tv/popular",
  seriesGenres: "/genre/tv/list",
} as const;

export { API_BASE_URL, API_ENDPOINTS };
