import { useEffect, useState } from "react";
import { getSeriesGenres } from "@/services";
import type { SeriesGenre } from "@/types";

const useSeriesGenres = () => {
  const [genres, setGenres] = useState<SeriesGenre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        const data = await getSeriesGenres(controller.signal);
        setGenres(data.genres);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Failed to fetch TV genres",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchGenres();

    return () => controller.abort();
  }, []);

  return { genres, isLoading, error };
};

export default useSeriesGenres;
