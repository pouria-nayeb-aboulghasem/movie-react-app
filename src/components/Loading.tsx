type LoadingProps = {
  index: number;
};

function Loading({ index }: LoadingProps) {
  return (
    <div
      key={index}
      className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/70"
    >
      <div className="aspect-2/3 animate-pulse bg-slate-800" />
      <div className="space-y-3 p-4">
        <div className="h-4 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-800" />
      </div>
    </div>
  );
}

export default Loading;
