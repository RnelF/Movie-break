import PopularMovieItems from "./PopularMovieItems";
import { useEffect, useRef } from "react";
import PopularMoviesPagination from "../Paginations/PopularMoviesPagination";
import "../custom-scrollbars.css";

const URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function PopularMoviesList({
  setMovieId,
  popularMovieData,
  setPopularMovieData,
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
    async function fetchPopularMoviesData() {
      const res = await fetch(`${URL}?api_key=${API_KEY}&page=1`);
      const data = await res.json();
      setPopularMovieData(data.results);
    }

    fetchPopularMoviesData();
  }, [setPopularMovieData]);

  return (
    <div className="pb-4 mx-4 615:mx-8 lg:mx-12 relative rounded-lg">
      <div className="m-5">
        <h1 className="text-2xl text-gray-200 font-semibold">Popular Now</h1>
      </div>

      <div
        ref={listTopRef}
        className="mt-5 flex flex-row overflow-y-hidden gap-3 scrollable-container"
      >
        {popularMovieData.map((movie) => (
          <PopularMovieItems
            key={movie.id}
            movie={movie}
            setMovieId={setMovieId}
          />
        ))}
      </div>
      <div>
        {popularMovieData.length > 0 && (
          <PopularMoviesPagination
            onPageChange={handlePageChange}
            setPopularMovieData={setPopularMovieData}
          />
        )}
      </div>
    </div>
  );
}
