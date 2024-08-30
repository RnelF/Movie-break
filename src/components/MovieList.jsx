import MovieItem from "./MovieItem.jsx";

export default function MovieList({ movieData, setMovieId }) {
  return (
    <div className="grid grid-cols-1 gap-4 375:grid-cols-2  justify-items-center mt-10 615:grid-cols-3 900:grid-cols-4 1200:grid-cols-5">
      {movieData.map((movie) => (
        <MovieItem setMovieId={setMovieId} key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
