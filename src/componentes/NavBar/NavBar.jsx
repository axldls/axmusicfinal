/* NavBar.jsx */

/**
 * Componente NavBar
 * 
 * Propósito: Barra de navegación superior de la aplicación
 * Contiene: logo, menú de categorías, carrito
 * 
 * Estructura:
 * - CardWidget: icono del carrito (arriba a la derecha)
 * - Logo: link al inicio (AxMusic)
 * - Menú de navegación: links a categorías de productos
 */

import React from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import CardWidget from "../CardWidget/CardWidget";

const NavBar = () => {
  return (
    // ========== HEADER (encabezado de la página) ==========
    <header>
      
      {/* ========== SECCIÓN 1: ICONO DEL CARRITO ========== */}
      {/* CardWidget muestra el icono del carrito con badge de cantidad */}
      {/* Se posiciona en la esquina superior derecha gracias a CSS */}
      <CardWidget/>
      
      {/* ========== SECCIÓN 2: LOGO DE LA TIENDA ========== */}
      {/* Link al inicio que navega a / */}
      {/* Muestra el nombre de la tienda "AxMusic" */}
      <Link to="/" className="navbar-logo">
        <h1>AxMusic</h1>
      </Link>
      
      {/* ========== SECCIÓN 3: MENÚ DE NAVEGACIÓN ========== */}
      {/* Menú desplegable con enlaces a categorías de productos */}
      <nav className="menu-dropdown">
        <ul>
          {/* OPCIÓN 1: Instrumentos Usados */}
          {/* NavLink navega a /categoria/2 donde 2 es el ID de la categoría "Usados" */}
          {/* NavLink es un Link especial de React Router que marca como "active" */}
          <li>
            <NavLink to="/categoria/2">Usados</NavLink>
          </li>
          
          {/* OPCIÓN 2: Instrumentos Nuevos */}
          {/* NavLink navega a /categoria/3 donde 3 es el ID de la categoría "Nuevos" */}
          <li>
            <NavLink to="/categoria/3">Nuevos</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
