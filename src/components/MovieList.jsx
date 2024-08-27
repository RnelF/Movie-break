import MovieItem from "./MovieItem.jsx";

export default function MovieList({ movieData, setMovieId }) {
  return (
    <div className="grid grid-cols-4">
      {movieData.map((movie) => (
        <MovieItem setMovieId={setMovieId} key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
