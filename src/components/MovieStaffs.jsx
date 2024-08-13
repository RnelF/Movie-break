import { useEffect, useState } from "react";

export default function MovieStaffs({ movieId }) {
  const [movieCrew, setMovieCrew] = useState({ crew: [] });
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const API_KEY = `5d4d812535feac9d594d1bdec7c43c81`;
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
    <div>
      <h1 className="text-5xl text-black">{movieCrew.original_name}</h1>
    </div>
  );
}
