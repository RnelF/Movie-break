import { useState, useRef } from "react";

import Nav from "./components/Nav";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Genres from "./components/Genres";
import PopularMoviesList from "./components/PopularMoviesList";
import HighestRatedMoviesList from "./components/HighestRatedMoviesList";
import TrendingMoviesList from "./components/TrendingMoviesList";
import PopularFilMoviesNowList from "./components/PopularFilMoviesNowList";

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
  const [highRatedMovieData, setHighRatedMovieData] = useState([]);
  const [trendingMovieData, setTrendingMovieData] = useState([]);
  const [actorMoviesData, setActorMoviesData] = useState([]);
  const [filMoviesData, setfilMoviesData] = useState([]);

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
        setMovieData={setMovieData}
        setIsUserSearch={setIsUserSearch}
        genreName={genreName}
        setGenreName={setGenreName}
        setIsGenreActive={setIsGenreActive}
        setActorMoviesData={setActorMoviesData}
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
        actorMoviesData={actorMoviesData}
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

      <TrendingMoviesList
        setTrendingMovieData={setTrendingMovieData}
        trendingMovieData={trendingMovieData}
        setMovieId={handleViewMovie}
      />
      <PopularFilMoviesNowList
        setfilMoviesData={setfilMoviesData}
        filMoviesData={filMoviesData}
        setMovieId={handleViewMovie}
      />

      <PopularMoviesList
        setMovieId={handleViewMovie}
        setPopularMovieData={setPopularMovieData}
        popularMovieData={popularMovieData}
      />
      <HighestRatedMoviesList
        setHighRatedMovieData={setHighRatedMovieData}
        highRatedMovieData={highRatedMovieData}
        setMovieId={handleViewMovie}
      />
    </>
  );
}

export default App;
