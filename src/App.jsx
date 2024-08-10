import { useState } from "react";
import Nav from "./components/Nav";
import MovieDetails from "./components/MovieDetails";
function App() {
  const [movieData, setMovieData] = useState([]);
  const [movieId, setMovieId] = useState("299536");
  return (
    <>
      <Nav />
      <MovieDetails movieId={movieId} />
    </>
  );
}

export default App;
