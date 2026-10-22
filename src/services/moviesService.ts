import type {
  MovieQuery,
  MovieApiResponse,
  MovieGenresApiResponse,
} from "@/types";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/constants";

const getMovies = async (
  query: MovieQuery,
  signal?: AbortSignal,
): Promise<MovieApiResponse> => {
  const endpoint = query.searchText.trim()
    ? API_ENDPOINTS.moviesQuery
    : API_ENDPOINTS.movies;

  const params: Record<string, string | number> = {
    page: query.page,
  };

  if (query.searchText.trim()) {
    params.query = query.searchText.trim();
  } else {
    params.sort_by = query.sortBy;

    if (query.genreId !== null) {
      params.with_genres = query.genreId;
    }
  }

  const response = await apiClient.get<MovieApiResponse>(endpoint, {
    params,
    signal: signal,
  });

  return response.data;
};

const getMovieGenres = async (
  signal?: AbortSignal,
): Promise<MovieGenresApiResponse> => {
  const response = await apiClient.get<MovieGenresApiResponse>(
    API_ENDPOINTS.genres,
    { signal },
  );

  return response.data;
};

export { getMovies, getMovieGenres };
