import { useEffect, useState } from "react";

export default function Genres({ movieData }) {
  const URL = "https://api.themoviedb.org/3/genre/movie/list";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      setGenres(data.genres);
    }
    fetchData();
  }, []);

  return (
    <div className="mt-4 ">
      <div className="flex flex-row flex-wrap justify-items-center gap-3 mx-5">
        {genres.map((genre) => (
          <div>
            <button
              className="bg-slate-200 py-1 px-2 rounded-sm text-nowrap text-sm hover:bg-slate-600 hover:text-white duration-200"
              key={genre.id}
              class
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
