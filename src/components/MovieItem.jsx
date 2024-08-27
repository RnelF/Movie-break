export default function MovieItem({ movie, setMovieId }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="grid">
      <img className="w-40" src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
      <h1>{movie.original_title}</h1>
    </div>
  );
}
