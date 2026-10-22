import { useCallback, useEffect, useState } from "react";
import { getSeries } from "@/services";
import type { Series, SeriesQuery } from "@/types";

const useSeries = (query: SeriesQuery) => {
  const [series, setSeries] = useState<Series[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = useCallback(() => {
    setReloadKey((previous) => previous + 1);
  }, []);

  const { page, searchText, genreId, sortBy } = query;

  useEffect(() => {
    const controller = new AbortController();

    const fetchSeries = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getSeries(
          { page, searchText, genreId, sortBy },
          controller.signal,
        );

        setSeries(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Failed to fetch TV series",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchSeries();

    return () => controller.abort();
  }, [page, searchText, genreId, sortBy, reloadKey]);

  return {
    series,
    totalPages,
    totalResults,
    isLoading,
    error,
    refresh,
  };
};

export default useSeries;
