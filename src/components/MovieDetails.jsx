import { useEffect, useState } from "react";
import MovieCasts from "./MovieCasts";
import MovieStaffs from "./MovieStaffs";

export default function MovieDetails({ movieId }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  const API_KEY = `5d4d812535feac9d594d1bdec7c43c81`;
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
    <div className=" mt-6 text-nowrap text-white">
      <div className=" w-90 iphoneXr:mx-5 bg-gray-800 rounded-lg p-2">
        <div className="w-40 h-68 mx-auto pt-4">
          <img
            className="w-full h-full rounded-sm border border-slate-300 "
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt="img"
          />
        </div>

        <div className="flex flex-col p-3">
          <div>
            <h1 className="text-lg text-wrap">{movie.original_title}</h1>
            <div className="mt-4 text-sm flex flex-col">
              {isLoading ? (
                <p>Loading . . . </p>
              ) : (
                <ul className=" list-none flex flex-row justify-start text-black">
                  {movie.genres.map((genre) => (
                    <li
                      className="bg-slate-300 rounded-lg pl-1 pr-1 mr-2 text-sm"
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col mt-3 text-xs">
                <div className="mr-4">⏳ {movie.runtime} Minutes</div>
                <div className="mr-4">📆 {movie.release_date}</div>
                <div>{movie.adult ? "🔞" : "✅PG"}</div>
              </div>
            </div>

            <div className="mt-2 text-xs">
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

          <div className="mt-6 text-xs">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              movie.production_companies.map((company) => (
                <div className="flex flex-col " key={company.id}>
                  <div className="mr-5">
                    <p>Budget: ${movie.budget.toLocaleString()}</p>
                    <p>Revenue: ${movie.revenue.toLocaleString()}</p>
                  </div>
                  <div className="mr-5">
                    <p>Origin Country: {company.origin_country}</p>
                    <p>Company Name: {company.name}</p>
                  </div>

                  <div className="mt-3">
                    {company.logo_path && (
                      <img
                        className="w-20 border border-slate-200 p-3"
                        src={`${IMAGE_BASE_URL}${company.logo_path}`}
                        alt={company.name}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-wrap mt-6 text-left text-xs w-11/12">
            <p className="font-bold text-lg">Overview</p>
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
    </div>
  );
}
