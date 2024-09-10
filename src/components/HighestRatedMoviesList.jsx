import { useEffect, useRef } from "react";
import HighRatedMovieItems from "./HighRatedMovieItems";
import HighRatedMovieListWithPagination from "../Paginations/HighRatedMovieListWithPagination.jsx";
import "../custom-scrollbars.css";

const URL = "https://api.themoviedb.org/3/movie/top_rated";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function HighestRatedMoviesList({
  setHighRatedMovieData,
  highRatedMovieData,
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
    async function fetchHighRatedMoviesData() {
      const res = await fetch(`${URL}?api_key=${API_KEY}&page=1`);
      const data = await res.json();
      setHighRatedMovieData(data.results);
    }

    fetchHighRatedMoviesData();
  }, [setHighRatedMovieData]);

  return (
    <div className="shadow-md shadow-slate-900 pb-4">
      <div className="m-5">
        <h1 className="text-2xl font-semibold">High Rated Movies</h1>
      </div>
      <div
        ref={listTopRef}
        className=" scrollable-container mt-5 flex flex-row overflow-auto gap-3"
      >
        {highRatedMovieData.map((movie) => (
          <HighRatedMovieItems
            key={movie.id}
            movie={movie}
            setMovieId={setMovieId}
          />
        ))}
      </div>
      <div>
        {highRatedMovieData.length > 0 && (
          <HighRatedMovieListWithPagination
            onPageChange={handlePageChange}
            setHighRatedMovieData={setHighRatedMovieData}
          />
        )}
      </div>
    </div>
  );
}
