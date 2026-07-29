import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "./constants";

class MovieApi {
  constructor(baseUrl, apiKey, imageBaseUrl) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._imageBaseUrl = imageBaseUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Error en la solicitud: ${response.status}`)
    );
  }

  _request(endpoint) {
    return fetch(
      `${this._baseUrl}${endpoint}${
        endpoint.includes("?") ? "&" : "?"
      }api_key=${this._apiKey}`
    ).then(this._checkResponse);
  }

  _getGenreNames(genreIds, genres) {
    const genreNames = genreIds
      .map((genreId) => {
        const genre = genres.find((item) => item.id === genreId);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .slice(0, 2);

    return genreNames.length > 0
      ? genreNames.join(" · ")
      : "Género no disponible";
  }

  _formatMovie(movie, genres) {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.release_date
        ? movie.release_date.slice(0, 4)
        : "Sin fecha",
      rating:
        typeof movie.vote_average === "number"
          ? movie.vote_average.toFixed(1)
          : "Sin calificación",
      genre: this._getGenreNames(movie.genre_ids || [], genres),
      overview: movie.overview || "Sin descripción disponible.",
      poster: movie.poster_path
        ? `${this._imageBaseUrl}${movie.poster_path}`
        : "",
      trailerUrl: "",
    };
  }

  getGenres() {
    return this._request("/genre/movie/list?language=es-MX").then(
      (data) => data.genres
    );
  }

   getPopularMovies() {
    return Promise.all([
      this._request("/movie/popular?language=es-MX&page=1"),
      this.getGenres(),
    ]).then(([movieData, genres]) =>
      movieData.results.map((movie) =>
        this._formatMovie(movie, genres)
      )
    );
  }
  
  searchMovies(query) {
  return Promise.all([
    this._request(
      `/search/movie?query=${encodeURIComponent(
        query
      )}&language=es-MX&page=1`
    ),
    this.getGenres(),
  ]).then(([movieData, genres]) =>
    movieData.results.map((movie) =>
      this._formatMovie(movie, genres)
    )
  );
}

  getMovieTrailer(movieId) {
    return this._request(
      `/movie/${movieId}/videos?language=es-MX`
    ).then((data) => {
      const trailer = data.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      if (!trailer) {
        return null;
      }

      return `https://www.youtube.com/watch?v=${trailer.key}`;
    });
  }
}

const movieApi = new MovieApi(
  BASE_URL,
  API_KEY,
  IMAGE_BASE_URL
);

export default movieApi;