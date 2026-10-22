type GenreErrorProps = {
  genresError: string;
};

function GenreError({ genresError }: GenreErrorProps) {
  return (
    <p
      role="alert"
      className="text-sm text-rose-300 sm:col-span-2 lg:col-span-3"
    >
      Could not load genres: {genresError}
    </p>
  );
}

export default GenreError;
