import { useState } from "react";
import Nav from "./components/Nav";
import MovieDetails from "./components/MovieDetails";
import MovieCasts from "./components/MovieCasts";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Genres from "./components/Genres";
function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieId, setMovieId] = useState("299534");
  return (
    <>
      <Nav movieId={movieId} setMovieId={setMovieId} />
      <Search movieData={movieData} setMovieData={setMovieData} />
      <Genres movieData={movieData} />
      <MovieList movieData={movieData} setMovieId={setMovieId} />

      <MovieDetails movieId={movieId} />
    </>
  );
}

export default App;
