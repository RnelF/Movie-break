import { useEffect, useState } from "react";

export default function MovieCasts({ movieId }) {
  const [castData, setCastData] = useState({ cast: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showCasts, setShowCasts] = useState(false); // State to control when to show the cast

  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const API_KEY = import.meta.env.REACT_APP_API_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchCasts() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setCastData(data);
      setIsLoading(false);
    }

    if (showCasts) {
      fetchCasts(); // Fetch data only if showCasts is true
    }
  }, [showCasts, movieId]); // Re-run when showCasts or movieId changes

  return (
    <div className="bg-gray-800 p-4">
      <button
        onClick={() => setShowCasts(!showCasts)} // Toggle the state when clicked
        className="bg-blue-500 text-white p-2 rounded"
      >
        {showCasts ? "Hide Cast" : "View All Cast"}
      </button>
      {showCasts && (
        <div>
          {isLoading ? (
            <p>Loading . . .</p>
          ) : (
            <div className="flex flex-col items-start gap-4 mt-4">
              {castData.cast.map((cast) => (
                <div key={cast.id} className="flex flex-row items-center">
                  {/* Image Container */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {cast.profile_path && (
                      <img
                        src={`${IMAGE_BASE_URL}${cast.profile_path}`}
                        alt={cast.name}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </div>
                  {/* Name Container */}
                  <p className="mt-2 text-white text-center ml-2 text-xs">
                    {cast.name} / {cast.character}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
