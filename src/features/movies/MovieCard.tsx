import type { Movie } from "@/types";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const releaseYear = movie.release_date
    ? new Date(`${movie.release_date}T00:00:00`).getFullYear()
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-300/40">
      <div className="relative aspect-2/3 overflow-hidden bg-slate-800">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400">
            Poster unavailable
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
          ★ {rating}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-white">
            {movie.title}
          </h2>
          {releaseYear && (
            <span className="shrink-0 pt-1 text-xs text-slate-400">
              {releaseYear}
            </span>
          )}
        </div>
        <p className="mt-3 line-clamp-3 min-h-18 text-sm leading-6 text-slate-400">
          {movie.overview || "No synopsis is available for this movie yet."}
        </p>
      </div>
    </article>
  );
};

export default MovieCard;
