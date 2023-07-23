import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <Link to="/">
        <h1>AxMusic</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/categoria/2">Usados</NavLink>
          </li>
          <li>
            <NavLink to="/categoria/3">Nuevos</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;