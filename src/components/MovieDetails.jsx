import { useEffect, useState } from "react";

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
    <div>
      <div className="m-14 flex">
        <img
          className="w-80 rounded-sm"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt="img"
        />

        <div className="flex flex-col ml-8">
          <div>
            <h1 className="text-5xl">{movie.original_title}</h1>
            <div className="mt-4 text-sm">
              {isLoading ? (
                <p>Loading . . . </p>
              ) : (
                <ul className="list-none flex flex-row justify-start">
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

          <div className="mt-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              movie.production_companies.map((company) => (
                <div key={company.id}>
                  {company.logo_path && (
                    <img
                      className="w-20"
                      src={`${IMAGE_BASE_URL}${company.logo_path}`}
                      alt={company.name}
                    />
                  )}
                  <p>Company Name: {company.name}</p>
                  <p>Origin Country: {company.origin_country}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
