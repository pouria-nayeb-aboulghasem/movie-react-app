import type {
  MovieQuery,
  MovieApiResponse,
  MovieGenresApiResponse,
} from "@/types";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/constants";

// pass query params and controller instance from input
const getMovies = async (
  query: MovieQuery,
  signal?: AbortSignal,
): Promise<MovieApiResponse> => {
  const isSearching = query.searchText.trim().length > 0;

  // detect routes based on search query param
  const endpoint = isSearching
    ? API_ENDPOINTS.moviesQuery
    : API_ENDPOINTS.movies;

  // feed url params
  const params: Record<string, string | number> = {
    page: query.page,
  };

  if (isSearching) {
    // feed search query param to url
    params.query = query.searchText.trim();
  } else {
    // feed sort param
    params.sort_by = query.sortBy;

    if (query.genreId !== null) {
      // feed genre param
      params.with_genres = query.genreId;
    }
  }

  // send request to server along with params and controller
  const response = await apiClient.get<MovieApiResponse>(endpoint, {
    params,
    signal: signal,
  });

  // serialize data
  return response.data;
};

// pass controller instance
const getMovieGenres = async (
  signal?: AbortSignal,
): Promise<MovieGenresApiResponse> => {
  // send request to server along with controller
  const response = await apiClient.get<MovieGenresApiResponse>(
    API_ENDPOINTS.genres,
    { signal },
  );

  // serialize data to array of genres
  return response.data;
};

export { getMovies, getMovieGenres };
