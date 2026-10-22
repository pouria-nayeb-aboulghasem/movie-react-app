import type { MovieGenre, SeriesGenre } from "@/types";

type GenresDropdownProps = {
  genreId: number | null;
  isLoadingGenres: boolean;
  genres: MovieGenre[] | SeriesGenre[];
  updateGenre: (value: string) => void;
};

function GenresDropdown({
  genreId,
  isLoadingGenres,
  updateGenre,
  genres,
}: GenresDropdownProps) {
  return (
    <label>
      <span className="sr-only">Filter by genre</span>
      <select
        value={genreId ?? ""}
        onChange={(event) => updateGenre(event.target.value)}
        disabled={isLoadingGenres}
        className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-200 outline-none transition focus:border-amber-300/60 disabled:cursor-wait disabled:opacity-60"
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default GenresDropdown;
