import { useEffect, useState } from "react";

export default function PersonDetailsComponent({ personDetails }) {
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
    <div>
      {personDetails ? (
        isLoading ? (
          <p>Loading . . . </p>
        ) : personData ? (
          <div key={personData.id}>
            <div>
              {personData.profile_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${personData.profile_path}`}
                  alt={`${personData.name}'s profile`}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div>
              <h1>{personData.name}</h1>
              <p>Popularity: {personData.popularity}</p>
            </div>
            <div>
              <h2>Known For:</h2>
              <ul>
                {personMovies.map((movie) => (
                  <li key={movie.id}>
                    <p>{movie.title || movie.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>No person data found</p>
        )
      ) : (
        <p>Please search for a person.</p>
      )}
    </div>
  );
}
