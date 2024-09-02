import { useState, useRef } from "react";

import Nav from "./components/Nav";
import MovieDetails from "./components/MovieDetails";
import MovieCasts from "./components/MovieCasts";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Genres from "./components/Genres";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieId, setMovieId] = useState("299534");
  const [genreId, setGenreId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isGenreChanged, setIsGenreChanged] = useState(false);
  const [isUserSearch, setIsUserSearch] = useState(false);
  const [showCasts, setShowCasts] = useState(false); // State to control when to show the full cast

  const movieDetailsRef = useRef(null);

  const handleViewMovie = (id) => {
    setMovieId(id);
    movieDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Nav movieId={movieId} setMovieId={setMovieId} />
      <Search
        movieData={movieData}
        setMovieData={setMovieData}
        setIsUserSearch={setIsUserSearch}
      />
      <Genres
        setIsGenreChanged={setIsGenreChanged}
        setIsUserSearch={setIsUserSearch}
        genres={genres}
        setGenres={setGenres}
        genreId={genreId}
        setGenreId={setGenreId}
        setMovieData={setMovieData}
      />
      <MovieList
        isGenreChanged={isGenreChanged}
        isUserSearch={isUserSearch}
        genres={genres}
        genreId={genreId}
        movieData={movieData}
        setMovieData={setMovieData}
        setMovieId={handleViewMovie}
        setShowCasts={setShowCasts}
      />

      <div ref={movieDetailsRef}>
        <MovieDetails
          movieId={movieId}
          showCasts={showCasts}
          setShowCasts={setShowCasts}
        />
      </div>
    </>
  );
}

export default App;
