type ErrorMessageProps = {
  title: string;
  error: string;
  refresh: () => void;
};

function ErrorMessage({ title, error, refresh }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-400/20 bg-rose-400/5 p-8 text-center"
    >
      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-rose-200">{error}</p>

      <div className="my-4">
        <button
          type="button"
          onClick={refresh}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
