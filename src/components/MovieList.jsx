import { useRef } from "react";
import MovieItem from "./MovieItem.jsx";
import MovieListWithPagination from "./MovieListWithPagination.jsx";
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
    <div>
      <div className="m-5">
        <h1 className="text-2xl font-semibold">
          {genreName ? `${genreName} Films` : ""}
        </h1>
      </div>
      <div
        ref={listTopRef}
        className="scrollable-container mt-5 flex flex-row overflow-auto gap-3"
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
