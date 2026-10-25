import { API_ENDPOINTS } from "@/constants";
import apiClient from "./apiClient";
import type {
  SeriesApiResponse,
  SeriesQuery,
  SeriesGenresApiResponse,
} from "@/types";

// pass series query params and controller instances from input
const getSeries = async (
  query: SeriesQuery,
  signal?: AbortSignal,
): Promise<SeriesApiResponse> => {
  // user type in search field
  const isSearching = query.searchText.trim().length > 0;

  // detect routes based on search query param
  const endpoint = isSearching
    ? API_ENDPOINTS.seriesQuery
    : API_ENDPOINTS.series;

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
  const response = await apiClient.get<SeriesApiResponse>(endpoint, {
    params,
    signal,
  });

  // serialize data
  return response.data;
};

// pass page param and controller instances from input
const getPopular = async (
  page = 1,
  signal?: AbortSignal,
): Promise<SeriesApiResponse> => {
  // send request to server along with params and controller
  const response = await apiClient.get<SeriesApiResponse>(
    API_ENDPOINTS.seriesPopular,
    {
      params: { page },
      signal,
    },
  );

  // serialize data
  return response.data;
};

// pass series controller instance from input
const getSeriesGenres = async (
  signal?: AbortSignal,
): Promise<SeriesGenresApiResponse> => {
  // send request to server along with controller
  const response = await apiClient.get<SeriesGenresApiResponse>(
    API_ENDPOINTS.seriesGenres,
    { signal },
  );

  // serialize data
  return response.data;
};

export { getSeries, getPopular, getSeriesGenres };
