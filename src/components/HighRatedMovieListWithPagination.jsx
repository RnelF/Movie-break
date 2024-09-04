import { useEffect, useState } from "react";

export default function HighRatedMovieListWithPagination({
  onPageChange,
  setHighRatedMovieData,
}) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setHighRatedMovieData(data.results);

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
          className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-500 hover:text-white"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} // Disable "Previous" button on the first page
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-500 hover:text-white"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
