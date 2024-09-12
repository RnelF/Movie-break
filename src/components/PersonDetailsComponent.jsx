import { useEffect, useState } from "react";
import PersonMovieItems from "./PersonMovieItems";

export default function PersonDetailsComponent({
  personDetails,
  setMovieId,
  setShowCasts,
}) {
  const URL = "https://api.themoviedb.org/3/search/person";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [personData, setPersonData] = useState(null);
  const [personMovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPersonDetails() {
      if (!personDetails) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `${URL}?api_key=${API_KEY}&query=${personDetails}`
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const person = data.results[0];
          setPersonData(person);
          setPersonMovies(person.known_for || []);
        } else {
          setPersonData(null);
          setPersonMovies([]);
        }
      } catch (error) {
        console.error("Error fetching Person Data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPersonDetails();
  }, [personDetails]);

  return (
    <div className="mx-auto flex justify-center bg-gradient-to-b from-burgundy-900 via-red-900 to-dark-end">
      {personDetails ? (
        isLoading ? (
          <p>Loading . . . </p>
        ) : personData ? (
          <div key={personData.id} className="flex flex-col gap-2 mx-auto">
            <div className="w-60 mx-auto">
              {personData.profile_path ? (
                <img
                  className="w-full rounded-lg"
                  src={`${IMAGE_BASE_URL}${personData.profile_path}`}
                  alt={`${personData.name}'s profile`}
                />
              ) : (
                <p>No image available</p>
              )}
              <div>
                <h1>{personData.name}</h1>
                <p>Popularity: {personData.popularity}</p>

                <p>
                  {personData.known_for_department === "Acting"
                    ? personData.gender === 1
                      ? "Actress"
                      : "Actor"
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h2>Known For:</h2>
              </div>
              <div className="mt-2 flex flex-row overflow-y-hidden gap-3">
                {personMovies.map((movie) => (
                  <PersonMovieItems
                    key={movie.id}
                    movie={movie}
                    setMovieId={setMovieId}
                    setShowCasts={setShowCasts}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}
