import { Movie } from "./Movie";

export function Movielist({ movies, onselectmovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onselectmovie={onselectmovie} />
      ))}
    </ul>
  );
}
