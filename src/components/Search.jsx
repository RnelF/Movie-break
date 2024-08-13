import { useEffect, useState } from "react";

const URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "5d4d812535feac9d594d1bdec7c43c81";

export default function Search({ setMovieData }) {
  const [query, setQuery] = useState("");

  // Function to fetch data
  async function fetchData() {
    const res = await fetch(
      `${URL}?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    );
    const data = await res.json();
    setMovieData(data);
  }

  // Fetch data when the component mounts or query changes
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        className="w-68 border border-b-slate-400 p-2"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={fetchData} // Trigger fetch on button click
        className="border border-slate-500 rounded-sm p-2 hover:bg-slate-700 duration-300"
      >
        🔍
      </button>
    </div>
  );
}
