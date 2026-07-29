import posterPlaceholder from "../../images/poster-placeholder.svg";
function MovieCard({ movie, onCardClick }) {
  function handleClick() {
    onCardClick(movie);
  }

  return (
    <li className="movie-card">
      <button
        className="movie-card__button"
        type="button"
        onClick={handleClick}
        aria-label={`Ver información de ${movie.title}`}
      >
        <img
        className="movie-card__image"
        src={movie.poster || posterPlaceholder}
        alt={`Póster de ${movie.title}`}
        onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = posterPlaceholder;
            }}
            />

        <div className="movie-card__content">
          <h3 className="movie-card__title">{movie.title}</h3>

          <p className="movie-card__details">
            {movie.year} · {movie.genre}
          </p>

          <p className="movie-card__rating">
            Calificación: {movie.rating}
          </p>
        </div>
      </button>
    </li>
  );
}

export default MovieCard;