export default function PopularMovieItems({
  movie,
  setMovieId,
  popularMovieData,
}) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="w-40 500:w-48 615:w-48 bg-zinc-300 flex flex-col justify-start items-center p-3 gap-2 mb-2">
      <div>
        <button
          onClick={() => {
            setMovieId(movie.id);
          }}
          className="bg-indigo-300 text-gray-800 font-semibold p-1 rounded-sm 500:text-lg 615:text-sm hover:text-gray-900 hover:bg-indigo-400  duration-200"
        >
          View Movie
        </button>
      </div>
      <div className="w-32 500:w-40 615:w-40 h-auto">
        <img className="w-full" src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
      </div>
      <div>{movie.title}</div>
    </div>
  );
}
