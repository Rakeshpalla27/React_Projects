import { Watchedmovieslist } from "./Watchedmovieslist";

export function Watchedmovies({ watched, removewatchmovie }) {
  return (
    <Watchedmovieslist watched={watched} removewatchmovie={removewatchmovie} />
  );
}
