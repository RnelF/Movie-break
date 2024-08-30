export default function MovieItem({ movie, setMovieId }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="w-40 500:w-48 615:w-48 bg-zinc-300 flex flex-col justify-start items-center p-3 gap-2">
      <div>
        <button
          onClick={() => {
            setMovieId(movie.id);
          }}
          className="bg-indigo-300 text-gray-800 font-semibold p-1 rounded-sm 500:text-lg 615:text-xl hover:text-gray-900 hover:bg-indigo-400 duration-200"
        >
          View Movie
        </button>
      </div>
      <div>
        <img
          className="w-32 500:w-40 615:w-40"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt="Poster Unavailable"
        />
      </div>
      <div>
        <h1 className="text-base text-wrap font-semibold 500:text-xl 615:text-xl">
          {movie.original_title}
        </h1>
      </div>
    </div>
  );
}
