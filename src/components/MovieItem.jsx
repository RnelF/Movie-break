export default function MovieItem({ movie, setMovieId }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="w-40 bg-slate-400 flex flex-col justify-center items-center p-3 gap-2">
      <div>
        <img className="w-32" src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
      </div>
      <div>
        <h1 className="text-sm text-wrap">{movie.original_title}</h1>
      </div>
    </div>
  );
}
