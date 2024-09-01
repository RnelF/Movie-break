import { useEffect, useState } from "react";

export default function Genres({ genreId, setGenreId, setMovieData }) {
  const URL = "https://api.themoviedb.org/3/genre/movie/list";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [genres, setGenres] = useState([]);

  const GENRE_URL = "https://api.themoviedb.org/3/discover/movie?with_genres=";

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      setGenres(data.genres);
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchMovieByGenre() {
      const res = await fetch(`${GENRE_URL}${genreId}&api_key=${API_KEY}`);
      const data = await res.json();
      setMovieData(data.results);
      console.log(data.results);
    }
    fetchMovieByGenre();
  }, [genreId]);

  return (
    <div className="mt-4 ">
      <h3 className="ml-5 mb-3">Categories:</h3>
      <div className="flex flex-row flex-wrap justify-items-center gap-3 mx-5">
        {genres.map((genre) => (
          <div key={genre.id}>
            <button
              className="bg-slate-200 py-1 px-2 rounded-sm text-nowrap text-sm hover:bg-slate-600 hover:text-white duration-200"
              key={genre.id}
              onClick={() => setGenreId(genre.id)}
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
