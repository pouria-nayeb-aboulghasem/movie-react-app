import { useEffect, useState } from "react";
import { getMovieGenres } from "@/services";
import type { MovieGenre } from "@/types";

const useMovieGenres = () => {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres(controller.signal);
        setGenres(data.genres);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Failed to fetch genres");
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

export default useMovieGenres;
