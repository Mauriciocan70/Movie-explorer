import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieApi from "../../utils/movieApi";
import posterPlaceholder from "../../images/poster-placeholder.svg";
import Preloader from "../Preloader/Preloader";

function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    movieApi
      .getPopularMovies()
      .then((movieData) => {
        setFeaturedMovies(movieData.slice(0, 3));
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <p className="home__eyebrow">
            Tu próxima película está aquí
          </p>

          <h1 className="home__title">
            Descubre historias que vale la pena ver
          </h1>

          <p className="home__description">
            Busca películas, consulta su información, conoce sus
            calificaciones y encuentra el tráiler antes de decidir qué ver.
          </p>

          <Link className="home__button" to="/movies">
            Explorar películas
          </Link>
        </div>
      </section>

      <section className="home__featured">
        <div className="home__section-heading">
          <div>
            <p className="home__section-label">Selección inicial</p>

            <h2 className="home__section-title">
              Películas destacadas
            </h2>
          </div>

          <Link className="home__section-link" to="/movies">
            Ver todas
          </Link>
        </div>

        {isLoading && <Preloader />}

        {hasError && (
          <p className="home__error">
            No fue posible cargar las películas destacadas.
          </p>
        )}

        {!isLoading && !hasError && (
          <ul className="home__featured-list">
            {featuredMovies.map((movie) => (
              <li className="home__featured-item" key={movie.id}>
                <img
                  className="home__featured-image"
                  src={movie.poster || posterPlaceholder}
                  alt={`Póster de ${movie.title}`}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = posterPlaceholder;
                  }}
                />

                <div className="home__featured-information">
                  <h3 className="home__featured-title">
                    {movie.title}
                  </h3>

                  <p className="home__featured-details">
                    {movie.year} · {movie.genre}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Home;