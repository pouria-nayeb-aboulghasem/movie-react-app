import { useEffect, useMemo, useState } from "react";
import MovieCard from "@/features/movies/MovieCard";
import useMovieGenres from "@/hooks/useMovieGenres";
import useMovies from "@/hooks/useMovies";
import GenreError from "@/components/GenreError";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import GenresDropdown from "@/components/GenresDropdown";
import Sorting from "@/components/Sorting";
import Paging from "@/components/Paging";
import ErrorMessage from "@/components/ErrorMessage";
import StatusBar from "@/components/StatusBar";

const sortOptions = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Top rated", value: "vote_average.desc" },
  { label: "Newest", value: "primary_release_date.desc" },
  { label: "Oldest", value: "primary_release_date.asc" },
];

function Movie() {
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [genreId, setGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);
  const { movies, totalPages, totalResults, isLoading, error, refresh } =
    useMovies({
      page,
      searchText,
      genreId,
      sortBy,
    });
  const {
    genres,
    isLoading: isLoadingGenres,
    error: genresError,
  } = useMovieGenres();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchText(searchInput.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const visibleMovies = useMemo(() => {
    const filtered =
      genreId === null || !searchText
        ? movies
        : movies.filter((movie) => movie.genre_ids.includes(genreId));

    if (!searchText) return filtered;

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popularity.desc":
          return b.popularity - a.popularity;
        case "vote_average.desc":
          return b.vote_average - a.vote_average;
        case "primary_release_date.desc":
          return b.release_date.localeCompare(a.release_date);
        case "primary_release_date.asc":
          return a.release_date.localeCompare(b.release_date);
        default:
          return 0;
      }
    });
  }, [genreId, movies, searchText, sortBy]);

  const updateGenre = (value: string) => {
    setGenreId(value ? Number(value) : null);
    setPage(1);
  };

  const updateSort = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const pageCount = Math.max(totalPages, 1);
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 -top-48 h-128 w-lg rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-120 w-120 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
        <Header
          isLoading={isLoading}
          error={error}
          searchText={searchText}
          genreId={genreId}
          visibleMovies={visibleMovies}
          totalResults={totalResults}
          title="Movie"
          subTitle="Finder"
          description="something worth watching."
          type="Movies"
        />

        <section
          aria-label="Movie search and filters"
          className="mb-9 grid gap-3 rounded-2xl border border-white/10 bg-white/4 p-4 shadow-2xl shadow-black/20 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.55fr)_minmax(12rem,0.55fr)]"
        >
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            label="Search movies"
          />

          <GenresDropdown
            genreId={genreId}
            isLoadingGenres={isLoadingGenres}
            updateGenre={updateGenre}
            genres={genres}
          />

          <Sorting
            sortBy={sortBy}
            updateSort={updateSort}
            sortOptions={sortOptions}
            title="Sort movies"
          />

          {genresError && <GenreError genresError={genresError} />}
        </section>

        {error ? (
          <ErrorMessage
            error={error}
            refresh={refresh}
            title="Movies could not be loaded"
          />
        ) : isLoading ? (
          <div
            aria-label="Loading movies"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <Loading index={index} />
            ))}
          </div>
        ) : visibleMovies.length > 0 ? (
          <>
            <StatusBar searchText={searchInput} visibleTypes={visibleMovies} />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {visibleMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        ) : (
          <NotFound
            title="No movies found"
            description="Try another search or choose a different genre."
          />
        )}

        {!error && totalPages > 1 && (
          <Paging
            isLoading={isLoading}
            setPage={setPage}
            page={page}
            pageCount={pageCount}
          />
        )}

        <footer className="mt-14 border-t border-white/10 pt-5 text-center text-xs text-slate-600">
          Movie information provided by TMDB
        </footer>
      </div>
      ;
    </>
  );
}

export default Movie;
