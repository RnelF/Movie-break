import { useEffect, useState } from "react";

export default function Genres({
  genreId,
  setGenreId,
  setMovieData,
  genres,
  setGenres,
  setIsGenreChanged,
  setIsUserSearch,
  setGenreName,
  setIsGenreActive,
  isGenreActive,
}) {
  const URL = "https://api.themoviedb.org/3/genre/movie/list";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const GENRE_URL = "https://api.themoviedb.org/3/discover/movie?with_genres=";

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      setGenres(data.genres);
    }
    fetchGenres();
  }, [setGenres]);

  useEffect(() => {
    async function fetchMovieByGenre() {
      const res = await fetch(`${GENRE_URL}${genreId}&api_key=${API_KEY}`);
      const data = await res.json();
      setMovieData(data.results);
      setIsGenreChanged(false);
      console.log(data.results);
    }
    fetchMovieByGenre();
  }, [genreId, setMovieData, setIsGenreChanged]);

  return (
    <div className="mt-4 shadow-md shadow-slate-400">
      <h3 className="ml-5 mb-3">Categories:</h3>
      <div className="flex flex-row flex-wrap justify-items-center gap-3 mx-5 ">
        {genres.map((genre) => (
          <div className="mb-2" key={genre.id}>
            <button
              className={`py-1 px-2 rounded-sm text-nowrap text-sm duration-200 ${
                genreId === genre.id && isGenreActive
                  ? "bg-slate-600 text-white"
                  : "bg-slate-200 hover:bg-slate-600 hover:text-white"
              }`}
              onClick={() => {
                setGenreId(genre.id);
                setIsGenreChanged(true);
                setIsUserSearch(false);
                setGenreName(genre.name);
                setIsGenreActive(true);
              }}
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
