import { useEffect, useState } from "react";

export default function MovieCasts({ movieId, showCasts, setShowCasts }) {
  const [castData, setCastData] = useState({ cast: [] });
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchCasts() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setCastData(data);
      setIsLoading(false);
    }

    fetchCasts(); // Fetch cast data on component mount
  }, [movieId]);

  const initialCast = castData.cast.slice(0, 4);
  const fullCast = castData.cast;

  return (
    <div className="bg-gray-800 p-4">
      <div>
        {isLoading ? (
          <p>Loading . . .</p>
        ) : (
          <div className="grid grid-cols lg:grid-cols-2 items-start gap-4 mt-4 ">
            {(showCasts ? fullCast : initialCast).map((cast) => (
              <div key={cast.id} className="flex items-center 615:gap-5">
                {/* Image Container */}
                <div className="w-12 h-12 615:w-20 615:h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {cast.profile_path && (
                    <img
                      src={`${IMAGE_BASE_URL}${cast.profile_path}`}
                      alt={cast.name}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
                {/* Name Container */}
                <p className="mt-2 text-white text-center ml-2 text-xs 615:text-lg lg:text-sm">
                  {cast.name} / {cast.character}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Toggle button */}
      {fullCast.length > 3 && (
        <button
          onClick={() => setShowCasts(!showCasts)}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          {showCasts ? "Hide Cast" : "View All Cast"}
        </button>
      )}
    </div>
  );
}
