import { useEffect, useState } from "react";
import MovieRatingIcon from "../icons/movie-rating.png";
import MoviePopularityIcon from "../icons/movie-popularity.png";

export default function PopularFilMoviesNowItems({ movie, setMovieId }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className="relative w-32 500:w-48 615:w-48 bg-black bg-opacity-60 rounded-lg mb-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="w-32 500:w-40 615:w-40 h-auto ">
        <img
          className="relative w-full rounded-lg cursor-pointer"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt="Poster Unavailable"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 rounded-lg transition-transform duration-300 ${
            showTooltip ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            top: 0,
            left: 0,
            zIndex: 20,
          }}
        >
          <div className="text-sm 500:text-lg text-gray-200 font-semibold text-center flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              <div className="text-xs flex justify-center">
                <div className="mr-1">
                  <img className="w-4" src={MovieRatingIcon} />
                </div>

                <div
                  style={{
                    textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
                  }}
                >
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <div className="text-xs flex justify-center">
                <div className="mr-1">
                  <img className="w-4" src={MoviePopularityIcon} />
                </div>
                <div
                  style={{
                    textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
                  }}
                >
                  {parseInt(movie.popularity).toLocaleString()}
                </div>
              </div>
            </div>

            <div
              className="text-sm"
              style={{
                textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
              }}
            >
              <h1>
                {movie.original_title.length > 30
                  ? `${movie.original_title.slice(0, 35)}...`
                  : movie.original_title}
              </h1>
            </div>
            <div>
              <button
                className="bg-red-700 text-white px-2 py-1 rounded mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setMovieId(movie.id);
                  setShowCasts(false);
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
