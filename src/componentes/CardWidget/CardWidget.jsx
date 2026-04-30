import "./CardWidget.css";
import { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link } from "react-router-dom";

/**
 * Componente CardWidget
 * 
 * Propósito: Mostrar el icono del carrito en la navbar con un badge de cantidad
 * Se actualiza en tiempo real cuando el usuario agrega/quita productos
 * 
 * Ubicación: Aparece en la esquina superior de la navbar (NavBar.jsx)
 * 
 * No recibe props, obtiene datos del CarritoContext
 */
const CardWidget = () => {
  // ========== CONTEXTO GLOBAL ==========
  // Obtiene cantidadTotal del CarritoContext
  // cantidadTotal es la cantidad total de unidades en el carrito
  // Se actualiza automáticamente cuando se agrega/elimina productos
  const {cantidadTotal} = useContext(CarritoContext);
  
  // ========== URL DE LA IMAGEN ==========
  // URL pública de un icono de carrito desde Flaticon
  // Se usa una URL externa para no depender de archivos locales
  const imgCarrito = "https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
  
  return (
    <div>
      {/* ========== LINK AL CARRITO ========== */}
      {/* Al hacer click, navega a la página del carrito /cart */}
      <Link to="/cart">
        {/* ========== ICONO DEL CARRITO ========== */}
        {/* Muestra la imagen del carrito desde Flaticon */}
        <img className="imgCarrito" src={imgCarrito} alt="Carrito" />
        
        {/* ========== BADGE CON CANTIDAD ========== */}
        {/* Muestra un número encima del icono indicando cuántos productos hay */}
        {/* Solo aparece si cantidadTotal es mayor a 0 (condicional: &&) */}
        {/* Estructura: si hay productos, muestra el número en una etiqueta <strong> */}
        {
          cantidadTotal > 0 && <strong> {cantidadTotal} </strong>
        }
      </Link>
    </div>
  )
}

export default CardWidget