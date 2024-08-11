import { useEffect, useState } from "react";

export default function MovieCasts({ movieId }) {
  const [castData, setCastData] = useState({ cast: [] });
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const API_KEY = `5d4d812535feac9d594d1bdec7c43c81`;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchCasts() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setCastData(data);
      setIsLoading(false);
    }
    fetchCasts();
  }, [movieId]);
  return (
    <div className="bg-slate-600 p-4">
      {isLoading ? (
        <p>Loading . . .</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {castData.cast.map((cast) => (
            <div key={cast.id} className="flex flex-col items-center">
              {/* Image Container */}
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                {cast.profile_path && (
                  <img
                    src={`${IMAGE_BASE_URL}${cast.profile_path}`}
                    alt={cast.name}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              {/* Name Container */}
              <p className="mt-2 text-white text-center">{cast.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
