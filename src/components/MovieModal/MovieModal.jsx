import { useEffect } from "react";
import posterPlaceholder from "../../images/poster-placeholder.svg";
function MovieModal({ movie, onClose }) {
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  function handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="movie-modal" onMouseDown={handleOverlayClose}>
      <article
        className="movie-modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          className="movie-modal__close-button"
          type="button"
          onClick={onClose}
          aria-label="Cerrar información de la película"
        >
          ×
        </button>

        <img
        className="movie-modal__image"
        src={movie.poster || posterPlaceholder}
        alt={`Póster de ${movie.title}`}
        onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = posterPlaceholder;
            }}
            />

        <div className="movie-modal__content">
          <h2 className="movie-modal__title" id="movie-modal-title">
            {movie.title}
          </h2>

          <p className="movie-modal__details">
            {movie.year} · {movie.genre} · Calificación {movie.rating}
          </p>

          <p className="movie-modal__overview">{movie.overview}</p>
          
          {movie.trailerUrl ? (
            <a
              className="movie-modal__trailer-link"
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver tráiler
  </a>
) : (
  <p className="movie-modal__no-trailer">
    Tráiler no disponible.
  </p>
)}
        </div>
      </article>
    </div>
  );
}

export default MovieModal;