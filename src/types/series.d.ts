type Series = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  first_air_date: string;
  genre_ids: number[];
  origin_country: string[];
};

type SeriesQuery = {
  page: number;
  searchText: string;
  genreId: number | null;
  sortBy: string;
};

type SeriesApiResponse = {
  page: number;
  results: Series[];
  total_pages: number;
  total_results: number;
};

type SeriesGenre = {
  id: number;
  name: string;
};

type SeriesGenresApiResponse = {
  genres: SeriesGenre[];
};

export type {
  SeriesGenre,
  SeriesGenresApiResponse,
  Series,
  SeriesApiResponse,
  SeriesQuery,
};
