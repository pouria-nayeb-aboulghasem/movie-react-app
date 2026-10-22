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

type SeriesGenre = {
  id: number;
  name: string;
};

type SeriesGenresApiResponse = {
  genres: SeriesGenre[];
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

export { Series, SeriesApiResponse, SeriesQuery };
export type { SeriesGenre, SeriesGenresApiResponse };
