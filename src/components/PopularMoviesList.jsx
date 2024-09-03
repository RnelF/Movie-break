import PopularMovieItems from "./PopularMovieItems";
import { useEffect, useState } from "react";

const URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function PopularMoviesList({
  setMovieId,
  popularMovieData,
  setPopularMovieData,
}) {
  useEffect(() => {
    async function fetchPopularMoviesData() {
      const res = await fetch(`${URL}?api_key=${API_KEY}&page=1`);
      const data = await res.json();
      setPopularMovieData(data.results);

      if (data.results.length > 0) {
        setMovieId(data.results[0].id);
      }
    }

    fetchPopularMoviesData();
  }, [setPopularMovieData, setMovieId]);

  return (
    <div className="shadow-md shadow-slate-900">
      <div className="m-5">
        <h1 className="text-2xl font-semibold">Popular Now</h1>
      </div>
      <div className="mt-5 flex flex-row overflow-auto gap-3">
        {popularMovieData.map((movie) => (
          <PopularMovieItems
            key={movie.id}
            movie={movie}
            setMovieId={setMovieId}
          />
        ))}
      </div>
    </div>
  );
}
