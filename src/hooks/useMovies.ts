import { useEffect, useState } from "react";
import { getMovies } from "@/services";
import type { Movie, MovieQuery } from "@/types";

const useMovies = (query: MovieQuery) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = () => {
    setReloadKey((previous) => previous + 1);
  };

  const { page, searchText, genreId, sortBy } = query;

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getMovies(
          { page, searchText, genreId, sortBy },
          controller.signal,
        );

        setMovies(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Failed to fetch movies");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [page, searchText, genreId, sortBy, reloadKey]);

  return {
    movies,
    totalPages,
    totalResults,
    isLoading,
    error,
    refresh,
  };
};

export default useMovies;
