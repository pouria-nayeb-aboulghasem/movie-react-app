import type { Movie, Series } from "@/types";

type StatusBarProps = {
  searchText: string;
  visibleTypes: Movie[] | Series[];
};

function StatusBar({ searchText, visibleTypes }: StatusBarProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">
        {searchText ? `Results for “${searchText}”` : "Popular movies"}
      </h2>
      <p className="text-xs text-slate-500">
        {visibleTypes.length} shown on this page
      </p>
    </div>
  );
}

export default StatusBar;
