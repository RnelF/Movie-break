import { useRef } from "react";
import MovieItem from "./MovieItem.jsx";
import MovieListWithPagination from "./MovieListWithPagination.jsx";

export default function MovieList({
  movieData,
  setMovieId,
  genreId,
  setMovieData,
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
      <div
        ref={listTopRef}
        className=" mt-10 flex flex-row overflow-auto gap-3"
      >
        {movieData.map((movie) => (
          <MovieItem setMovieId={setMovieId} key={movie.id} movie={movie} />
        ))}
      </div>
      <div>
        {movieData.length > 0 && (
          <MovieListWithPagination
            genreId={genreId}
            setMovieData={setMovieData}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
