export default function HighRatedMovieItems({ movie, setMovieId }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="w-40 500:w-48 615:w-48 bg-black bg-opacity-60 flex flex-col justify-start items-center p-3 gap-2 mb-2 rounded-lg">
      <div>
        <button
          onClick={() => {
            setMovieId(movie.id);
          }}
          className="bg-red-600 text-gray-200 font-semibold p-1 rounded-sm 500:text-lg 615:text-sm hover:text-gray-900 hover:bg-red-500  duration-200 "
        >
          View Movie
        </button>
      </div>
      <div className="w-32 500:w-40 615:w-40 h-auto">
        <img
          className="w-full rounded-lg"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt="Poster Unavailable"
        />
      </div>
      <div>
        <h1 className="text-base text-wrap font-semibold 500:text-xl 615:text-xl text-gray-200">
          {movie.original_title}
        </h1>
      </div>
    </div>
  );
}
