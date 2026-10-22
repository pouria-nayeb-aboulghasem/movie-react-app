import { useEffect, useMemo, useState } from "react";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import useSeries from "@/hooks/useSeries";
import useSeriesGenres from "@/hooks/useSeriesGenres";
import SeriesCard from "@/features/series/SeriesCard";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import GenresDropdown from "@/components/GenresDropdown";
import Sorting from "@/components/Sorting";
import GenreError from "@/components/GenreError";
import Paging from "@/components/Paging";
import StatusBar from "@/components/StatusBar";
import ErrorMessage from "@/components/ErrorMessage";

const sortOptions = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Top rated", value: "vote_average.desc" },
  { label: "Newest", value: "first_air_date.desc" },
  { label: "Oldest", value: "first_air_date.asc" },
];

function Series() {
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [genreId, setGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);
  const { series, totalPages, totalResults, isLoading, error, refresh } =
    useSeries({
      page,
      searchText,
      genreId,
      sortBy,
    });
  const {
    genres,
    isLoading: isLoadingGenres,
    error: genresError,
  } = useSeriesGenres();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchText(searchInput.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const visibleSeries = useMemo(() => {
    const filtered =
      genreId === null || !searchText
        ? series
        : series.filter((item) => item.genre_ids.includes(genreId));

    if (!searchText) return filtered;

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popularity.desc":
          return b.popularity - a.popularity;
        case "vote_average.desc":
          return b.vote_average - a.vote_average;
        case "first_air_date.desc":
          return b.first_air_date.localeCompare(a.first_air_date);
        case "first_air_date.asc":
          return a.first_air_date.localeCompare(b.first_air_date);
        default:
          return 0;
      }
    });
  }, [genreId, searchText, series, sortBy]);

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
          visibleMovies={visibleSeries}
          totalResults={totalResults}
          title="TV"
          subTitle="Series"
          description="your next series to watch."
          type="series"
        />

        <section
          aria-label="TV series search and filters"
          className="mb-9 grid gap-3 rounded-2xl border border-white/10 bg-white/4 p-4 shadow-2xl shadow-black/20 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.55fr)_minmax(12rem,0.55fr)]"
        >
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            label="Search TV series"
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
            title="Sort TV series"
          />

          {genresError && <GenreError genresError={genresError} />}
        </section>

        {error ? (
          <ErrorMessage
            error={error}
            refresh={refresh}
            title="TV series could not be loaded"
          />
        ) : isLoading ? (
          <div
            aria-label="Loading TV series"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <Loading key={index} index={index} />
            ))}
          </div>
        ) : visibleSeries.length > 0 ? (
          <>
            <StatusBar searchText={searchInput} visibleTypes={visibleSeries} />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {visibleSeries.map((item) => (
                <SeriesCard key={item.id} series={item} />
              ))}
            </div>
          </>
        ) : (
          <NotFound
            title="No TV series found"
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
          TV series information provided by TMDB
        </footer>
      </div>
    </>
  );
}

export default Series;
