type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  release_date: string;
  genre_ids: number[];
};

type MovieQuery = {
  page: number;
  searchText: string;
  genreId: number | null;
  sortBy: string;
};

type MovieApiResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

type MovieGenre = {
  id: number;
  name: string;
};

type MovieGenresApiResponse = {
  genres: MovieGenre[];
};

export type { Movie, MovieQuery, MovieApiResponse, MovieGenre, MovieGenresApiResponse };
