import { useEffect, useState } from "react";
import MovieRatingIcon from "../icons/movie-rating.png";
import ThumbsUpIcon from "../icons/thumbs-up.png";
export default function RecommendedMovieItem({
  movie,
  setMovieId,
  setShowCasts,
}) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className="relative w-24 500:w-40 bg-black bg-opacity-60 rounded-lg mb-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="w-24 500:w-32 h-auto">
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
          <div className="text-sm 500:text-lg text-gray-200 font-semibold text-center flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <div className="text-11 flex justify-center ">
                <div>
                  <img className="w-3" src={MovieRatingIcon} />
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
              <div className="text-11 flex">
                <div>
                  <img className="w-3" src={ThumbsUpIcon} />
                </div>

                <div
                  style={{
                    textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
                  }}
                >
                  {movie.vote_count.toLocaleString()}
                </div>
              </div>
            </div>

            <div
              className="text-sm text-wrap"
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
                className="bg-red-700 text-white text-xs px-1 py-1 rounded mt-2"
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
