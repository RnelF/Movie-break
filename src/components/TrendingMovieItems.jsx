import "../custom_css/edgeFade.css";
export default function TrendingMovieItems({ movie, setMovieId }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="w-32 500:w-48 615:w-48 bg-black bg-opacity-60 flex flex-col justify-start items-center p-3 gap-2 mb-2 rounded-lg edge-fade">
      <div className="w-24 500:w-40 615:w-40 h-auto">
        <img
          className="w-full rounded-lg cursor-pointer"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt="Poster Unavailable"
          onClick={() => {
            setMovieId(movie.id);
          }}
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
