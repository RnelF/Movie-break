import { useEffect, useRef, useState } from "react";
import TrendingMovieItems from "./TrendingMovieItems.jsx";
import TrendingMovieListWithPagination from "../Paginations/TrendingMovieListWithPagination.jsx";
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
      console.log(data.results);
    }

    fetchTrendingMoviesData();
  }, [setTrendingMovieData]);

  return (
    <div className="pb-4 mx-2 relative rounded-lg">
      <div className="m-5">
        <h1 className="text-2xl text-gray-200 font-semibold">Trending Now</h1>
      </div>

      {/* Movie List */}
      <div
        ref={listTopRef}
        className="mt-5 flex flex-row overflow-y-hidden gap-3 scrollable-container"
      >
        {trendingMovieData.map((movie) => (
          <TrendingMovieItems
            key={movie.id}
            movie={movie}
            setMovieId={setMovieId}
          />
        ))}
      </div>

      {/* Pagination */}
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
