import { useState } from "react";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSearch(trimmedQuery);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor="movie-search">
        Buscar película
      </label>

      <div className="search-form__controls">
        <input
          className="search-form__input"
          id="movie-search"
          type="text"
          placeholder="Escribe el nombre de una película"
          value={query}
          onChange={handleChange}
          required
        />

        <button className="search-form__button" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
}

export default SearchForm;