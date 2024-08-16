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
    <div className="text-nowrap text-white m-12">
      <div className=" w-108 bg-gray-800 rounded-lg p-3">
        <div className="w-48 h-68 mx-auto my-4">
          <img
            className="w-full h-full rounded-sm border border-slate-300 "
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt="img"
          />
        </div>

        <div className="flex flex-col ml-8">
          <div>
            <h1 className="text-5xl">{movie.original_title}</h1>
            <div className="mt-4 text-sm flex">
              {isLoading ? (
                <p>Loading . . . </p>
              ) : (
                <ul className="list-none flex flex-row justify-start text-black">
                  {movie.genres.map((genre) => (
                    <li
                      className="bg-slate-300 rounded-lg pl-1 pr-1 mr-2"
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex">
                <div className="mr-4">⏳ {movie.runtime} Minutes</div>
                <div className="mr-4">📆 {movie.release_date}</div>
                <div>{movie.adult ? "🔞" : "✅PG"}</div>
              </div>
            </div>

            <div className="mt-2 text-sm">
              <p>
                Popularity:{" "}
                <span className=" ml-1 font-semibold text-lg">
                  🔥{movie.popularity}
                </span>
              </p>
              <p className="mt-1">
                Rating:
                <span className=" ml-1 font-semibold text-lg">
                  ⭐{movie.vote_average}
                </span>
              </p>
              <p className="mt-1">
                Votes:{" "}
                <span className=" ml-1 font-semibold text-lg">
                  👥{movie.vote_count}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              movie.production_companies.map((company) => (
                <div
                  className="flex flex-col border border-white"
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

                  <div>
                    {company.logo_path && (
                      <img
                        className="w-20"
                        src={`${IMAGE_BASE_URL}${company.logo_path}`}
                        alt={company.name}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-wrap mt-6 text-left text-sm w-11/12">
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
