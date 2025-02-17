import { useEffect, useState } from "react";
import Searchmsg from "./Searchmsg";
import { Error } from "./Error";
import { Loader } from "./Loader";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { Numresults } from "./Numresults";
import { Main } from "./Main";
import { Box } from "./Box";
import { Movielist } from "./Movielist";
import { MovieDetails } from "./MovieDetails";
import { Summary } from "./Summary";
import { Watchedmovies } from "./Watchedmovies";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const key = "4735bdc2";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [selectedid, setSelectedid] = useState(null);

  function handleSelectMovie(id) {
    setSelectedid((selectedid) => (selectedid === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedid(null);
  }
  function handleWatchedMovie(movie) {
    setWatched((w) => [...w, movie]);
  }

  function handleremovewatched(id) {
    setWatched((w) => w.filter((m) => m.imdbID !== id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        setIsloading(true);
        setError("");
        try {
          const res =
            await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}
        `);
          if (!res.ok)
            throw new Error("Something went wrong while fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsloading(false);
        } catch (err) {
          setError(err.message ? err.message : " Movie not found!");
        } finally {
          setIsloading(false);
        }
      }
      if (query.length === 0) {
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navigation>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navigation>
      <Main>
        <Box>
          <>
            <Searchmsg query={query} />
            {/* {isloading ? <Loader /> : <Movielist movies={movies} />} */}
            {isloading && <Loader />}
            {!isloading && !error && (
              <Movielist movies={movies} onselectmovie={handleSelectMovie} />
            )}
            {error && <Error err={error} />}
          </>
        </Box>
        <Box>
          {selectedid ? (
            <MovieDetails
              selectedid={selectedid}
              onclosemovie={handleCloseMovie}
              addwatchlist={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <Watchedmovies
                watched={watched}
                removewatchmovie={handleremovewatched}
              />
            </>
          )}
        </Box>
        {/* <Watchedbox /> */}
      </Main>
    </>
  );
}
