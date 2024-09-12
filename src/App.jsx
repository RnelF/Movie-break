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
import PersonDetailsComponent from "./components/PersonDetailsComponent";

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
  const [personDetails, setPersonDetails] = useState([]);

  const movieDetailsRef = useRef(null);
  const personDetailsRef = useRef(null);

  const handleViewMovie = (id) => {
    setMovieId(id); // Update movieId
    setTimeout(() => {
      if (movieDetailsRef.current) {
        movieDetailsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const handleViewPerson = (name) => {
    setPersonDetails(name); // Update movieId
    setTimeout(() => {
      if (personDetailsRef.current) {
        personDetailsRef.current.scrollIntoView({ behavior: "smooth" });
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
      <div ref={personDetailsRef}>
        {personDetails && (
          <PersonDetailsComponent
            personDetails={personDetails}
            setShowCasts={setShowCasts}
            setMovieId={setMovieId}
          />
        )}
      </div>

      <div ref={movieDetailsRef}>
        {movieId && (
          <MovieDetails
            movieId={movieId}
            showCasts={showCasts}
            setShowCasts={setShowCasts}
            setMovieId={handleViewMovie}
            setPersonDetails={handleViewPerson}
            personDetails={personDetails}
          />
        )}
      </div>

      <TrendingMoviesList
        setTrendingMovieData={setTrendingMovieData}
        trendingMovieData={trendingMovieData}
        setMovieId={handleViewMovie}
        setShowCasts={setShowCasts}
      />
      <PopularFilMoviesNowList
        setfilMoviesData={setfilMoviesData}
        filMoviesData={filMoviesData}
        setMovieId={handleViewMovie}
        setShowCasts={setShowCasts}
      />

      <PopularMoviesList
        setMovieId={handleViewMovie}
        setPopularMovieData={setPopularMovieData}
        popularMovieData={popularMovieData}
        setShowCasts={setShowCasts}
      />
      <HighestRatedMoviesList
        setHighRatedMovieData={setHighRatedMovieData}
        highRatedMovieData={highRatedMovieData}
        setMovieId={handleViewMovie}
        setShowCasts={setShowCasts}
      />
    </>
  );
}

export default App;
