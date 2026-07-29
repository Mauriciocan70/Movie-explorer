import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MovieList from "../MovieList/MovieList";
import MovieModal from "../MovieModal/MovieModal";
import movieApi from "../../utils/movieApi";
import NothingFound from "../NothingFound/NothingFound";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState(3);

  useEffect(() => {
    movieApi
      .getPopularMovies()
      .then((movieData) => {
        setMovies(movieData);
        setVisibleMovies(3);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

function handleSearch(query) {
  setIsLoading(true);
  setHasError(false);

  movieApi
    .searchMovies(query)
    .then((movieData) => {
      setMovies(movieData);
      setVisibleMovies(3);
    })
    .catch((error) => {
      console.error(error);
      setHasError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
}

function handleShowMore() {
  setVisibleMovies((currentValue) => currentValue + 3);
}

  function handleCardClick(movie) {
  movieApi
    .getMovieTrailer(movie.id)
    .then((trailerUrl) => {
      setSelectedMovie({
        ...movie,
        trailerUrl,
      });
    })
    .catch((error) => {
      console.error(error);

      setSelectedMovie(movie);
    });
}

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  return (
    <main className="movies">
      <section className="movies__intro">
        <p className="movies__eyebrow">Movie Explorer</p>

        <h1 className="movies__title">Encuentra una película</h1>

        <p className="movies__description">
          Escribe un título para consultar películas y obtener más información.
        </p>

        <SearchForm onSearch={handleSearch} />
      </section>

      {isLoading && <Preloader />}

{hasError && (
  <p>No fue posible cargar las películas. Intenta nuevamente.</p>
)}

{!isLoading && !hasError && movies.length === 0 && (
  <NothingFound />
)}

{!isLoading && !hasError && movies.length > 0 && (
  <>
    <MovieList
      movies={movies.slice(0, visibleMovies)}
      onCardClick={handleCardClick}
    />

    {movies.length > visibleMovies && (
      <button
        className="movies__load-more"
        type="button"
        onClick={handleShowMore}
      >
        Mostrar más
      </button>
    )}
  </>
)}

{selectedMovie && (
  <MovieModal
    movie={selectedMovie}
    onClose={handleCloseModal}
  />
)}
      
    </main>
  );
}

export default Movies;