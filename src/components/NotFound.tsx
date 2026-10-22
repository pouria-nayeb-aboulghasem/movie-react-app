type NotFoundProps = {
  title: string;
  description: string;
};

function NotFound({ title, description }: NotFoundProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 px-6 py-16 text-center">
      <p className="text-4xl" aria-hidden="true">
        🍿
      </p>
      <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

export default NotFound;
