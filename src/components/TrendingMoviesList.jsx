import { useEffect, useRef, useState } from "react";
import TrendingMovieItems from "./TrendingMovieItems.jsx";
import TrendingMovieListWithPagination from "./TrendingMovieListWithPagination.jsx";
import "../custom-scrollbars.css";
import ArrowLeft from "../images/ArrowLeft.png";
import ArrowRight from "../images/ArrowRight.png";
import "../custom_css/sliderAnimation.css";

const URL = "https://api.themoviedb.org/3/trending/movie/week";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TrendingMoviesList({
  setTrendingMovieData,
  trendingMovieData,
  setMovieId,
}) {
  const [animating, setAnimating] = useState(null);
  const listTopRef = useRef(null);

  const handlePageChange = () => {
    if (listTopRef.current) {
      listTopRef.current.scroll({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // Scroll left and right logic
  const scrollLeft = () => {
    if (listTopRef.current) {
      listTopRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
      setAnimating("left");
      setTimeout(() => setAnimating(null), 300);
    }
  };

  const scrollRight = () => {
    if (listTopRef.current) {
      listTopRef.current.scrollBy({
        left: 350, // Adjust the value as necessary
        behavior: "smooth",
      });
      setAnimating("right");
      setTimeout(() => setAnimating(null), 300);
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
    <div className="pb-4 mx-6 relative">
      <div className="m-5">
        <h1 className="text-2xl font-semibold">Trending Now</h1>
      </div>

      {/* Scroll Buttons */}
      <button
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-55 text-white w-24 h-40 rounded-full p-3 shadow-lg hover:bg-black flex items-center justify-start  ${
          animating === "left" ? "animate-slide" : ""
        }`}
        onClick={scrollLeft}
      >
        <img className="w-16 animate-slide" src={ArrowLeft} />
      </button>
      <button
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-55 text-white w-24 h-40  rounded-full p-3 shadow-lg hover:bg-black flex items-center justify-end ${
          animating === "right" ? "animate-slide" : ""
        }`}
        onClick={scrollRight}
      >
        <img className="w-16" src={ArrowRight} />
      </button>

      {/* Movie List */}
      <div
        ref={listTopRef}
        className="scrollable-container mt-5 flex flex-row overflow-hidden gap-3"
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
