import { useEffect, useState } from "react";

export default function MovieListWithPagination({ genreId, setMovieData }) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setMovieData(data.results);
    }
    fetchMovies();
  }, [page]);

  return (
    <div>
      {/* Movie list rendering */}
      {/* Assuming movieData is rendered here */}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-500 hover:text-white"
          onClick={() => setPage(page - 1)}
          disabled={page === 1} // Disable "Previous" button on the first page
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-500 hover:text-white"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
