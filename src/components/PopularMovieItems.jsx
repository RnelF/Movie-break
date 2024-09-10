import { useEffect, useState } from "react";

export default function PopularMovieItems({ movie, setMovieId }) {
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
            <div>
              <div className="text-xs">
                <p>Tmdb Popularity</p>
              </div>
              <div className="text-xs">
                <div
                  style={{
                    textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
                  }}
                >
                  <img src={`https://www.flaticon.com/free-icons/review`} />
                  {movie.popularity}
                </div>
              </div>
            </div>

            <div
              className="text-base"
              style={{
                textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
              }}
            >
              <h1>{movie.original_title}</h1>
            </div>
            <div>
              <button
                className="bg-red-700 text-white px-2 py-1 rounded mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setMovieId(movie.id);
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
