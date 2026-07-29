import MovieCard from "../MovieCard/MovieCard";

function MovieList({ movies, onCardClick }) {
  return (
    <section className="movie-list" aria-labelledby="movie-results-title">
      <h2 className="movie-list__title" id="movie-results-title">
        Películas destacadas
      </h2>

      <ul className="movie-list__items">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default MovieList;