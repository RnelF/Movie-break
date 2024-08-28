import { useEffect, useState } from "react";

export default function MovieStaffs({ movieId }) {
  const [movieCrew, setMovieCrew] = useState({ crew: [] });
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchDirector() {
      try {
        const res = await fetch(`${URL}?api_key=${API_KEY}`);
        const data = await res.json();
        const directorData = data.crew.filter(({ job }) => job === "Director");
        console.log(directorData);
        setMovieCrew(directorData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching director data:", error);
        setIsLoading(false);
      }
    }

    fetchDirector();
  }, [movieId]);

  return (
    <div className="mt-3">
      {isLoading ? (
        <p>Loading . . .</p>
      ) : (
        <div className="flex">
          {" "}
          <p className="mr-4 mt-1 text-md 615:text-xl">Directed by:</p>
          {movieCrew.map((crew) => (
            <div key={crew.id} className="mr-4">
              <h1 className="text-lg text-center 615:text-2xl">{crew.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
