import { useEffect, useState } from "react";

export default function MovieDetails({ movieId }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  const API_KEY = `5d4d812535feac9d594d1bdec7c43c81`;
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [movieId]);
  return (
    <div>
      <div>
        <img src={movie.poster_path} alt="img" />
        <h1>{movie.original_title}</h1>
      </div>
    </div>
  );
}
