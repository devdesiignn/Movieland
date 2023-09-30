import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = `https://www.omdbapi.com/?apikey=b89b72fe`;

// const placeholder = {
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
//   Title: "Italian Spiderman",
//   Type: "movie",
//   Year: "2007",
//   imdbID: "tt2705436",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const { data } = await axios.get(`${API_URL}&s=${title}`);

    // Introspection
    // console.log(data.Search);

    setMovies(data.Search);
  };

  // Do this on component render
  useEffect(() => {
    searchMovies("spider-man");
  }, []);

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search For Movies"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt={"Search"}
            onClick={() => {
              searchMovies(searchTerm);
            }}
          />
        </div>

        <div className="container">
          {movies ? (
            movies?.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))
          ) : (
            <div className="empty">
              <h2>No Movies</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;

