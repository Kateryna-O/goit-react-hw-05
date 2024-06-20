import { NavLink } from "react-router-dom";
import css from "./NavBar.module.css";
import clsx from "clsx";

const getClassName = ({ isActive }) => {
  return clsx(css.navlink, isActive && css.isActive);
};
const NavBar = () => {
  return (
    <nav className={css.navbar}>
      <NavLink to="/" className={getClassName}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getClassName}>
        Movies
      </NavLink>
    </nav>
  );
};

export default NavBar;
