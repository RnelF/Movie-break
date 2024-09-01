import MovieItem from "./MovieItem.jsx";
import MovieListWithPagination from "./MovieListWithPagination.jsx";
export default function MovieList({
  movieData,
  setMovieId,
  genreId,
  setMovieData,
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 375:grid-cols-1    justify-items-center mt-10  615:grid-cols-3 900:flex 900:flex-row overflow-scroll ">
        {movieData.map((movie) => (
          <MovieItem setMovieId={setMovieId} key={movie.id} movie={movie} />
        ))}
      </div>
      <div>
        {movieData.length > 0 && (
          <MovieListWithPagination
            genreId={genreId}
            setMovieData={setMovieData}
          />
        )}
      </div>
    </div>
  );
}
