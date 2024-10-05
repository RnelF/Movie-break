import { useEffect, useState } from "react";
import PersonMovieItems from "./PersonMovieItems";
import PopularityIcon from "../icons/movie-popularity.png";

export default function PersonDetailsComponent({
  personDetails,
  setPersonDetails,
  setMovieId,
  setShowCasts,
}) {
  const URL = "https://api.themoviedb.org/3/search/person";
  const personId_URL = `https://api.themoviedb.org/3/person/`;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [personData, setPersonData] = useState(null);
  const [personMovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [personId, setPersonId] = useState(""); //get person Id to fetch more details
  const [personMoreData, setPersonMoreData] = useState([]);

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
          setPersonMovies(person.known_for);
          setPersonId(person.id);
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

  useEffect(() => {
    async function fetchMorePersonDetails() {
      try {
        const res = await fetch(
          `${personId_URL}${personId}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setPersonMoreData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching more Person Data", error);
      }
    }
    fetchMorePersonDetails();
  }, [personId]);

  return (
    <div className="lg:w-3/4 mx-auto">
      {personDetails !== "" ? (
        isLoading ? (
          <div>Loading ...</div>
        ) : personData ? (
          <div
            className="text-gray-200 h-auto pt-3 mx-auto shadow-xl rounded-lg flex flex-col lg:px-16 justify-center bg-gradient-to-b from-burgundy-900 via-red-900 to-dark-end"
            style={{
              textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),
                    2px 2px 4px rgba(0, 0, 0, 1)`,
            }}
          >
            <div
              key={personData.id}
              className="flex flex-col gap-2 mx-auto lg:flex-row justify-center items-center"
            >
              <div className="w-36 h-auto lg:w-52 mx-auto flex-shrink-0">
                {personData.profile_path ? (
                  <img
                    className="w-full rounded-lg"
                    src={`${IMAGE_BASE_URL}${personData.profile_path}`}
                    alt={`${personData.name}'s profile`}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className="justify-center items-start flex flex-col gap-2 mx-3 w-auto">
                <div>
                  <h1 className="text-nowrap ">{personData.name}</h1>
                </div>
                <div>
                  <p>
                    {personData.known_for_department === "Acting"
                      ? personData.gender === 1
                        ? "Actress"
                        : "Actor"
                      : ""}
                  </p>
                </div>

                <div className="flex gap-1 justify-start items-center">
                  {/*for popularity logo and value*/}
                  <div>
                    <img className="w-4" src={PopularityIcon} />
                  </div>
                  <div>{personData.popularity}</div>
                </div>
                <div className="lg:w-3/4">
                  <p className="text-xs text-wrap">
                    {personMoreData.biography}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-auto">
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
                    setPersonDetails={setPersonDetails}
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
