import { useEffect, useRef } from "react";
import TrendingMovieItems from "./TrendingMovieItems.jsx";
import TrendingMovieListWithPagination from "./TrendingMovieListWithPagination.jsx";
import "../custom-scrollbars.css";

const URL = "https://api.themoviedb.org/3/trending/movie/week";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TrendingMoviesList({
  setTrendingMovieData,
  trendingMovieData,
  setMovieId,
}) {
  const listTopRef = useRef(null);

  const handlePageChange = () => {
    if (listTopRef.current) {
      listTopRef.current.scroll({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    async function fetchTrendingMoviesData() {
      const res = await fetch(`${URL}?api_key=${API_KEY}&page=1`);
      const data = await res.json();
      setTrendingMovieData(data.results);
    }

    fetchTrendingMoviesData();
  }, [setTrendingMovieData]);

  return (
    <div className="shadow-md shadow-slate-900 pb-4">
      <div className="m-5">
        <h1 className="text-2xl font-semibold">Trending Movies</h1>
      </div>
      <div
        ref={listTopRef}
        className=" scrollable-container mt-5 flex flex-row overflow-auto gap-3"
      >
        {trendingMovieData.map((movie) => (
          <TrendingMovieItems
            key={movie.id}
            movie={movie}
            setMovieId={setMovieId}
          />
        ))}
      </div>
      <div>
        {trendingMovieData.length > 0 && (
          <TrendingMovieListWithPagination
            onPageChange={handlePageChange}
            setTrendingMovieData={setTrendingMovieData}
          />
        )}
      </div>
    </div>
  );
}
