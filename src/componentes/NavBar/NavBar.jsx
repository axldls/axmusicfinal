/* NavBar.jsx */
import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import CardWidget from "../CardWidget/CardWidget";


const NavBar = () => {
  return (
    <header>
      <CardWidget/>
      <Link to="/" className="navbar-logo"> {/* Agrega una clase "navbar-logo" */}
        <h1>AxMusic</h1>
      </Link>
      <nav className="menu-dropdown">
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
