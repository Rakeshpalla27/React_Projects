import { Watchedmovie } from "./Watchedmovie";

export function Watchedmovieslist({ watched, removewatchmovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watchedmovie
          movie={movie}
          key={movie.imdbID}
          removewatchmovie={removewatchmovie}
        />
      ))}
    </ul>
  );
}
