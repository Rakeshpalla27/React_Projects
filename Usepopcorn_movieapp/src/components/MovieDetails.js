import { useState, useEffect } from "react";
import Starrating from "../Starrating";
import { key } from "./App";
import { Loader } from "./Loader";

export function MovieDetails({
  selectedid,
  onclosemovie,
  addwatchlist,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const iswatched = watched.map((movie) => movie.imdbID).includes(selectedid);
  const watcheduserrating = watched.find(
    (m) => m.imdbID === selectedid
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedmovie = {
      imdbID: selectedid,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    addwatchlist(newWatchedmovie);
    onclosemovie();
  }

  useEffect(function () {
    function callback(e) {
      if (e.code === "Escape") {
        onclosemovie();
        console.log("closing");
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  });

  useEffect(
    function () {
      async function getmoviedetails() {
        setIsloading(true);
        const res =
          await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedid}
      `);
        const data = await res.json();
        setMovie(data);
        setIsloading(false);
      }
      getmoviedetails();
    },
    [selectedid]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `MOVIE | ${title}`;
      return () => (document.title = "usePopcorn");
    },
    [title]
  );
  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onclosemovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of the ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!iswatched ? (
                <Starrating
                  maxrating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              ) : (
                <p>
                  You rated this movie {watcheduserrating}
                  <span>⭐</span>
                </p>
              )}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  +Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
