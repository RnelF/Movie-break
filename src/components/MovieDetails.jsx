import { useEffect, useState } from "react";
import MovieCasts from "./MovieCasts";
import MovieStaffs from "./MovieStaffs";

export default function MovieDetails({ movieId, showCasts, setShowCasts }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [backdropImg, setBackdropImg] = useState("");

  useEffect(() => {
    async function fetchMovieBackdropImg() {
      try {
        const res = await fetch(`${URL}/images?api_key=${API_KEY}`);
        const data = await res.json();
        if (data.backdrops && data.backdrops.length > 0) {
          setBackdropImg(
            `https://image.tmdb.org/t/p/original${data.backdrops[0].file_path}`
          );
        } else {
          setBackdropImg(""); // Or provide a default image URL
        }
      } catch (error) {
        console.error("Error fetching movie backdrop image:", error);
      }
    }
    fetchMovieBackdropImg();
  }, [movieId]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${URL}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);
  return (
    <div className=" mt-4 text-nowrap text-white mx-auto ">
      <div className=" w-90 mx-auto 615:w-auto 615:h-auto 615:mx-10  rounded-lg bg-gradient-to-b from-dark-start via-dark-middle to-dark-end min-h-screen">
        <div
          className="1500:flex 1500:flex-row flex items-end lg:bg-cover lg:bg-center bg-right h-160 rounded-lg"
          style={{
            backgroundImage: `url(${backdropImg})`,
            backgroundSize: "cover", // or 'contain'
            backgroundPosition: "center", // Default for large screens
            "@media (max-width: 640px)": {
              backgroundSize: "contain", // Adjust size for smaller screens
              backgroundPosition: "top right", // Adjust position for smaller screens
            },
          }}
        >
          <div className="flex m-2 justify-start">
            <div className="w-48 h-auto mx-auto 615:w-56 lg:w-64 lg:pl-4 lg:pb-4 pt-4 1500:w-72 flex items-center">
              <div>
                <img
                  className="w-full rounded-lg border border-slate-300 "
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt="img"
                />
              </div>
            </div>

            <div className="flex flex-col p-3 615:p-10 justify-items-end">
              <div>
                <h1
                  className="text-xl text-gray-200 font-semibold text-wrap 615:text-5xl 1500:text-3xl mt-2"
                  style={{
                    textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
                  }}
                >
                  {movie.original_title}
                </h1>
              </div>

              <div className="mt-4 text-sm flex flex-col">
                {isLoading ? (
                  <p>Loading . . . </p>
                ) : (
                  <ul className=" list-none grid grid-cols-3 gap-2  text-black w-auto">
                    {movie.genres.map((genre) => (
                      <li
                        className="bg-slate-300 rounded-lg  text-11 615:text-md px-1 text-center  overflow-hidden whitespace-nowrap overflow-ellipsis"
                        key={genre.id}
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className="615:flex 615:flex-col lg:flex-col lg:justify-start mt-3 text-gray-200"
                style={{
                  textShadow: `
                    1px 2px 2px rgba(0, 0, 0, 1),  /* Dark shadow to ensure readability */
                    2px 2px 4px rgba(0, 0, 0, 1)`,
                }}
              >
                <div className="flex flex-col mt-3 text-xs 615:text-base">
                  <div className="mr-4">Runtime:⏳ {movie.runtime} Minutes</div>
                  <div className="mr-4">Released: 📆 {movie.release_date}</div>
                  <div>{movie.adult ? "🔞" : "✅PG"}</div>
                </div>

                <div className="mt-2 text-xs 615:text-base">
                  <p>
                    Popularity:{" "}
                    <span className=" ml-1 font-semibold text-md">
                      🔥{movie.popularity}
                    </span>
                  </p>
                  <p className="mt-1">
                    TmDB Rating:
                    <span className=" ml-1 font-semibold text-md">
                      ⭐{movie.vote_average}
                    </span>
                  </p>
                  <p className="mt-1">
                    TmDB Votes:{" "}
                    <span className=" ml-1 font-semibold text-md">
                      👥{movie.vote_count}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs 615:text-lg 615:text-wrap pl-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            movie.production_companies.length > 0 && (
              <div className="flex flex-col 615:flex-row 615:items-center 615:mb-10">
                <div className="mr-5">
                  <p>
                    Origin Country:{" "}
                    {movie.production_companies[0].origin_country}
                  </p>
                  <p>Company Name: {movie.production_companies[0].name}</p>
                </div>

                <div className="mt-3 mb-4">
                  {movie.production_companies[0].logo_path && (
                    <img
                      className="w-20 p-3 615:w-28"
                      src={`${IMAGE_BASE_URL}${movie.production_companies[0].logo_path}`}
                      alt="No Logo Available"
                    />
                  )}
                </div>
              </div>
            )
          )}
        </div>

        <div className="text-wrap mt-6 text-left text-xs w-11/12 615:text-lg p-3">
          <p className="font-bold text-lg 615:text-2xl">Overview</p>
          <p>{movie.overview}</p>
        </div>

        <div className="p-3">
          <MovieStaffs movieId={movieId} />
        </div>

        <div className="p-3">
          <MovieCasts
            movieId={movieId}
            showCasts={showCasts}
            setShowCasts={setShowCasts}
          />
        </div>
      </div>
    </div>
  );
}
