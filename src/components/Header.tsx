import type { Movie, Series } from "@/types";

type HeaderProps = {
  isLoading: boolean;
  error: string | null;
  searchText: string;
  genreId: number | null;
  visibleMovies: Movie[] | Series[];
  totalResults: number;
  title: string;
  subTitle: string;
  description: string;
  type: string;
};

function Header({
  isLoading,
  error,
  searchText,
  genreId,
  visibleMovies,
  totalResults,
  title,
  subTitle,
  description,
  type,
}: HeaderProps) {
  return (
    <header className="mb-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-amber-300">
        Your next favorite
      </p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            {title}
            <span className="text-amber-300">{subTitle}</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Search the collection, explore genres, and find {description}
          </p>
        </div>
        {!isLoading && !error && (
          <p className="text-sm text-slate-400">
            {searchText && genreId !== null
              ? `${visibleMovies.length} matches on this page`
              : `${totalResults.toLocaleString()} ${type} to explore`}
          </p>
        )}
      </div>
    </header>
  );
}

export default Header;
