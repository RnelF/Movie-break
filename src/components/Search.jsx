import { useEffect, useState } from "react";

const URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search({ movieData, setMovieData, setIsUserSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${URL}?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovieData(data.results);
    }

    // Fetch data when the component mounts or query changes

    fetchData();
  }, [query]);

  return (
    <div className="flex justify-center mt-6">
      <input
        className="w-2/4  border border-b-slate-400 p-2"
        type="text"
        placeholder="Search movie"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsUserSearch(true);
        }}
      />
    </div>
  );
}
