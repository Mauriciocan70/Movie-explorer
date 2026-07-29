import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <NavLink className="header__logo" to="/">
          Movie Explorer
        </NavLink>

        <nav className="header__navigation" aria-label="Navegación principal">
          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link_active" : ""}`
            }
            to="/"
          >
            Inicio
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link_active" : ""}`
            }
            to="/movies"
          >
            Explorar
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;