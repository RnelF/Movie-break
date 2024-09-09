import { useEffect, useState } from "react";
import ArrowLeft from "../images/ArrowLeft.png";
import ArrowRight from "../images/ArrowRight.png";

export default function TrendingMovieListWithPagination({
  onPageChange,
  setTrendingMovieData,
}) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setTrendingMovieData(data.results);

      if (onPageChange) {
        onPageChange();
      }
    }
    fetchMovies();
  }, [page]);

  return (
    <div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-red-600 py-1 px-3 rounded hover:bg-red-400"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} // Disable "Previous" button on the first page
        >
          <img className="w-2" src={ArrowLeft} />
        </button>
        <span className="text-base font-semibold">{page}</span>
        <button
          className="bg-red-600 py-1 px-3 rounded hover:bg-red-400"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          <img className="w-2" src={ArrowRight} />
        </button>
      </div>
    </div>
  );
}
