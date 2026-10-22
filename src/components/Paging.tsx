type PagingProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  pageCount: number;
};

function Paging({ page, setPage, isLoading, pageCount }: PagingProps) {
  return (
    <nav
      aria-label="Movie pages"
      className="mt-10 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => setPage((current) => Math.max(1, current - 1))}
        disabled={page <= 1 || isLoading}
        className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-amber-300/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span aria-live="polite" className="text-sm text-slate-400">
        Page <span className="font-semibold text-white">{page}</span> of{" "}
        <span className="font-semibold text-white">{pageCount}</span>
      </span>
      <button
        type="button"
        onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
        disabled={page >= pageCount || isLoading}
        className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-amber-300/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default Paging;
