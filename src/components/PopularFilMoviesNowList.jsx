import { useEffect, useRef, useState } from "react";
import PopularFilMoviesNowItems from "./PopularFilMoviesNowItems.jsx";
import PopularFilMoviesNowPagination from "../Paginations/PopularFilMoviesNowPagination.jsx";
import "../custom-scrollbars.css";

const URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function PopularFilMoviesNowList({
  setfilMoviesData,
  filMoviesData,
  setMovieId,
  setShowCasts,
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
    async function fetchFilMoviesData() {
      const res = await fetch(
        `${URL}?api_key=${API_KEY}&with_original_language=tl&primary_release_year=2024&sort_by=popularity.desc&page=1`
      );
      const data = await res.json();
      setfilMoviesData(data.results);
      console.log(data.results);
    }

    fetchFilMoviesData();
  }, [setfilMoviesData]);

  return (
    <div className="pb-4 mx-4 615:mx-8 lg:mx-12 relative rounded-lg">
      <div className="m-5">
        <h1 className="text-2xl text-gray-200 font-semibold">
          Popular Filipino Movies on Tmdb Now
        </h1>
      </div>

      <div
        ref={listTopRef}
        className="mt-5 flex flex-row overflow-y-hidden gap-3 scrollable-container"
      >
        {filMoviesData.map((movie) => (
          <PopularFilMoviesNowItems
            key={movie.id}
            movie={movie}
            setMovieId={setMovieId}
          />
        ))}
      </div>

      {/* Pagination */}
      <div>
        {filMoviesData.length > 0 && (
          <PopularFilMoviesNowPagination
            onPageChange={handlePageChange}
            setfilMoviesData={setfilMoviesData}
            setShowCasts={setShowCasts}
          />
        )}
      </div>
    </div>
  );
}
