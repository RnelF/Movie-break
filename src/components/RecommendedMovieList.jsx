import RecommendedMovieItem from "./RecommendedMovieItem";
export default function RecommendedMovieList({
  recommendedMovieData,
  setMovieId,
  setShowCasts,
}) {
  return (
    <div className="pb-4 mx-4 615:mx-8 lg:mx-12 relative rounded-lg">
      <div className="text-lg text-gray-200 font-semibold">
        You May Also Enjoy
      </div>
      <div className="mt-5 flex flex-row overflow-y-hidden gap-3 scrollable-container">
        {Array.isArray(recommendedMovieData) &&
        recommendedMovieData.length > 0 ? (
          recommendedMovieData.map((movie) => (
            <RecommendedMovieItem
              setMovieId={setMovieId}
              key={movie.id}
              movie={movie}
              setShowCasts={setShowCasts}
            />
          ))
        ) : (
          <p>No recommended movies available</p>
        )}
      </div>
    </div>
  );
}
