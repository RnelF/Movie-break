import { useEffect, useState } from "react";

const SEARCH_PERSON_URL = "https://api.themoviedb.org/3/search/person";
const MOVIE_CREDITS_URL = "https://api.themoviedb.org/3/person"; // For actor's movie credits
const SEARCH_MOVIE_URL = "https://api.themoviedb.org/3/search/movie"; // For movie search
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search({
  setMovieData,
  setIsUserSearch,
  genreName,
  setGenreName,
  setIsGenreActive,
  setActorMoviesData,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (query) {
        try {
          //Fetch actor's movies
          const actorFetch = fetch(
            `${SEARCH_PERSON_URL}?query=${encodeURIComponent(
              query
            )}&api_key=${API_KEY}`
          );

          //Fetch normal movies by title
          const movieFetch = fetch(
            `${SEARCH_MOVIE_URL}?query=${encodeURIComponent(
              query
            )}&api_key=${API_KEY}`
          );

          // Execute both fetches in parallel
          const [actorRes, movieRes] = await Promise.all([
            actorFetch,
            movieFetch,
          ]);

          const actorData = await actorRes.json();
          const movieData = await movieRes.json();

          if (actorData.results.length > 0) {
            const actorId = actorData.results[0].id; // Get the actor's ID
            const movieCreditsRes = await fetch(
              `${MOVIE_CREDITS_URL}/${actorId}/movie_credits?api_key=${API_KEY}`
            );
            const movieCreditsData = await movieCreditsRes.json();
            setActorMoviesData(movieCreditsData.cast); // Set the actor's movies
          }

          setMovieData(movieData.results); // Set the movies from the normal search
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    if (genreName) {
      setGenreName("");
    }

    fetchData();
  }, [query, genreName]);

  return (
    <div className="flex justify-center mt-6">
      <input
        className="w-2/4  border border-b-slate-400 p-2"
        type="text"
        placeholder="Search movie"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsUserSearch(true);
          setIsGenreActive(false);
        }}
      />
    </div>
  );
}
