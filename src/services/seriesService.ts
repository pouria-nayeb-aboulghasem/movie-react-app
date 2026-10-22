import { API_ENDPOINTS } from "@/constants";
import apiClient from "./apiClient";
import type {
  SeriesApiResponse,
  SeriesQuery,
  SeriesGenresApiResponse,
} from "@/types";

const getSeries = async (
  query: SeriesQuery,
  signal?: AbortSignal,
): Promise<SeriesApiResponse> => {
  const isSearching = query.searchText.trim().length > 0;

  const endpoint = isSearching
    ? API_ENDPOINTS.seriesQuery
    : API_ENDPOINTS.series;

  const params: Record<string, string | number> = {
    page: query.page,
  };

  if (isSearching) {
    params.query = query.searchText.trim();
  } else {
    params.sort_by = query.sortBy;

    if (query.genreId !== null) {
      params.with_genres = query.genreId;
    }
  }

  const response = await apiClient.get<SeriesApiResponse>(endpoint, {
    params,
    signal,
  });

  return response.data;
};

const getPopular = async (
  page = 1,
  signal?: AbortSignal,
): Promise<SeriesApiResponse> => {
  const response = await apiClient.get<SeriesApiResponse>(
    API_ENDPOINTS.seriesPopular,
    {
      params: { page },
      signal,
    },
  );

  return response.data;
};

const getSeriesGenres = async (
  signal?: AbortSignal,
): Promise<SeriesGenresApiResponse> => {
  const response = await apiClient.get<SeriesGenresApiResponse>(
    API_ENDPOINTS.seriesGenres,
    { signal },
  );

  return response.data;
};

export { getSeries, getPopular, getSeriesGenres };
