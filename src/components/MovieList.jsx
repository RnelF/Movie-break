import MovieItem from "./MovieItem.jsx";

export default function MovieList({ movieData, setMovieId }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 ml-6">
      {movieData.map((movie) => (
        <MovieItem setMovieId={setMovieId} key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
