import { useState, useRef } from "react";

import Nav from "./components/Nav";
import MovieDetails from "./components/MovieDetails";
import MovieCasts from "./components/MovieCasts";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Genres from "./components/Genres";
import PopularMoviesList from "./components/PopularMoviesList";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [genreId, setGenreId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isGenreChanged, setIsGenreChanged] = useState(false);
  const [isUserSearch, setIsUserSearch] = useState(false);
  const [showCasts, setShowCasts] = useState(false); // State to control when to show the full cast
  const [genreName, setGenreName] = useState("");
  const [isGenreActive, setIsGenreActive] = useState(false);
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [movieIdFromPopular, setmovieIdFromPopular] = useState([]);

  const movieDetailsRef = useRef(null);

  const handleViewMovie = (id) => {
    setMovieId(id); // Update movieId
    setTimeout(() => {
      if (movieDetailsRef.current) {
        movieDetailsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };
  return (
    <>
      <Nav movieId={movieId} setMovieId={setMovieId} />
      <Search
        movieData={movieData}
        setMovieData={setMovieData}
        setIsUserSearch={setIsUserSearch}
        genreName={genreName}
        setGenreName={setGenreName}
        setIsGenreActive={setIsGenreActive}
      />
      <Genres
        setIsGenreChanged={setIsGenreChanged}
        setIsUserSearch={setIsUserSearch}
        genres={genres}
        setGenres={setGenres}
        genreId={genreId}
        setGenreId={setGenreId}
        setMovieData={setMovieData}
        setGenreName={setGenreName}
        setIsGenreActive={setIsGenreActive}
        isGenreActive={isGenreActive}
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
        genreName={genreName}
      />
      <PopularMoviesList
        setMovieId={handleViewMovie}
        setPopularMovieData={setPopularMovieData}
        popularMovieData={popularMovieData}
        setmovieIdFromPopular={setmovieIdFromPopular}
      />

      <div ref={movieDetailsRef}>
        {movieId && (
          <MovieDetails
            movieId={movieId}
            showCasts={showCasts}
            setShowCasts={setShowCasts}
          />
        )}
      </div>
    </>
  );
}

export default App;
