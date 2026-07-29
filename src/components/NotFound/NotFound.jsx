import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__code">404</p>

      <h1 className="not-found__title">Página no encontrada</h1>

      <p className="not-found__description">
        La dirección que intentaste abrir no existe o fue modificada.
      </p>

      <Link className="not-found__link" to="/">
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;