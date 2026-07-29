export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const MOVIES_PER_PAGE = 3;
export const MOCK_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    year: "2014",
    rating: 8.7,
    genre: "Ciencia ficción",
    overview:
      "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio para buscar un nuevo hogar para la humanidad.",
    poster:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  },
  {
    id: 2,
    title: "Dune: Part Two",
    year: "2024",
    rating: 8.5,
    genre: "Ciencia ficción",
    overview:
      "Paul Atreides se une a Chani y a los Fremen mientras busca vengarse de quienes destruyeron a su familia.",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
  },
  {
    id: 3,
    title: "The Batman",
    year: "2022",
    rating: 7.8,
    genre: "Crimen",
    overview:
      "Batman investiga una serie de asesinatos que revelan secretos oscuros relacionados con Ciudad Gótica.",
    poster:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=900&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
  },
];