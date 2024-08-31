import { useEffect, useState } from "react";
import MovieCasts from "./MovieCasts";
import MovieStaffs from "./MovieStaffs";

export default function MovieDetails({ movieId }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`${URL}?api_key=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [movieId]);
  return (
    <div className=" mt-4 text-nowrap text-white">
      <div className=" w-90 iphoneXr:mx-5 415:mx-auto 615:w-auto 615:h-auto 615:mx-10 bg-gray-800 rounded-lg p-2 lg:p-5">
        <div className="1500:flex 1500:flex-row items-center">
          <div className="lg:flex lg:justify-start ">
            <div className="w-40 h-68 mx-auto lg:mx-10 pt-4 615:w-80 615:h-auto 615:pt-8 1500:w-100">
              <img
                className="w-full h-full rounded-sm border border-slate-300 "
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt="img"
              />
            </div>

            <div className="flex flex-col p-3 615:p-10 ">
              <h1 className="text-lg text-wrap 615:text-5xl 1500:text-3xl">
                {movie.original_title}
              </h1>
              <div className="mt-4 text-sm flex flex-col">
                {isLoading ? (
                  <p>Loading . . . </p>
                ) : (
                  <ul className=" list-none grid grid-cols-3 gap-2  text-black w-fit">
                    {movie.genres.map((genre) => (
                      <li
                        className="bg-slate-300 rounded-lg  text-sm 615:text-lg px-1 text-center"
                        key={genre.id}
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="615:flex 615:flex-row lg:flex-col 615:justify-between lg:justify-start mt-3">
                <div className="flex flex-col mt-3 text-xs 615:text-xl">
                  <div className="mr-4">⏳ {movie.runtime} Minutes</div>
                  <div className="mr-4">📆 {movie.release_date}</div>
                  <div>{movie.adult ? "🔞" : "✅PG"}</div>
                </div>

                <div className="mt-2 text-xs 615:text-xl">
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

          <div className="mt-3 text-xs 615:text-lg 615:text-wrap ">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              movie.production_companies.map((company) => (
                <div
                  className="flex flex-col 615:flex-row 615:items-center 615:mb-10 "
                  key={company.id}
                >
                  <div className="mr-5">
                    <p>Budget: ${movie.budget.toLocaleString()}</p>
                    <p>Revenue: ${movie.revenue.toLocaleString()}</p>
                  </div>
                  <div className="mr-5">
                    <p>Origin Country: {company.origin_country}</p>
                    <p>Company Name: {company.name}</p>
                  </div>

                  <div className="mt-3 mb-4">
                    {company.logo_path && (
                      <img
                        className="w-20 p-3 615:w-28"
                        src={`${IMAGE_BASE_URL}${company.logo_path}`}
                        alt="No Logo Available"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-wrap mt-6 text-left text-xs w-11/12 615:text-lg">
          <p className="font-bold text-lg 615:text-2xl">Overview</p>
          <p>{movie.overview}</p>
        </div>

        <div>
          <MovieStaffs movieId={movieId} />
        </div>

        <div>
          <MovieCasts movieId={movieId} />
        </div>
      </div>
    </div>
  );
}
