type SortingProps = {
  sortBy: string;
  updateSort: (value: string) => void;
  sortOptions: { label: string; value: string }[];
  title: string;
};

function Sorting({ sortBy, updateSort, sortOptions, title }: SortingProps) {
  return (
    <label>
      <span className="sr-only">{title}</span>
      <select
        value={sortBy}
        onChange={(event) => updateSort(event.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-200 outline-none transition focus:border-amber-300/60"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Sorting;
