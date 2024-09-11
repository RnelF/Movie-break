import { useRef } from "react";
import MovieItem from "./MovieItem.jsx";
import MovieListWithPagination from "../Paginations/MovieListWithPagination.jsx";
import "../custom-scrollbars.css";

export default function MovieList({
  movieData,
  setMovieId,
  genreId,
  setMovieData,
  genres,
  isGenreChanged,
  isUserSearch,
  setShowCasts,
  genreName,
  actorMoviesData,
}) {
  const listTopRef = useRef(null);

  const handlePageChange = () => {
    if (listTopRef.current) {
      listTopRef.current.scroll({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pb-4 mx-4 615:mx-8 lg:mx-12 relative rounded-lg">
      <div className="m-5">
        <h1 className="text-2xl text-gray-200 font-semibold">
          {genreName ? `${genreName} Films` : ""}
        </h1>
      </div>
      <div
        ref={listTopRef}
        className="mt-5 flex flex-row overflow-y-hidden gap-3 scrollable-container"
      >
        {actorMoviesData.map((movie) => (
          <MovieItem
            setMovieId={setMovieId}
            key={movie.id}
            movie={movie}
            setShowCasts={setShowCasts}
          />
        ))}
        {movieData.map((movie) => (
          <MovieItem
            setMovieId={setMovieId}
            key={movie.id}
            movie={movie}
            setShowCasts={setShowCasts}
          />
        ))}
      </div>
      <div>
        {isUserSearch
          ? ""
          : movieData.length > 0 && (
              <MovieListWithPagination
                genres={genres}
                genreId={genreId}
                setMovieData={setMovieData}
                onPageChange={handlePageChange}
                isGenreChanged={isGenreChanged}
              />
            )}
      </div>
    </div>
  );
}
