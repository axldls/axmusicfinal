import React, { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import "./CartItem.css";

/**
 * Componente CartItem
 * 
 * Propósito: Mostrar UN producto individual dentro del carrito
 * Se renderiza múltiples veces en Cart.jsx, una por cada producto
 * Permite ver detalles del producto y eliminarlo del carrito
 * 
 * Props recibidas:
 * - item: objeto con {id, nombre, precio} del producto
 * - cantidad: cantidad de unidades de este producto en el carrito
 * (Estas props vienen de Cart.jsx usando spread {...producto})
 */
const CartItem = ({ item, cantidad }) => {
  // ========== CONTEXTO GLOBAL ==========
  // Obtiene la función eliminarProducto del CarritoContext
  // Se usa para remover este producto del carrito cuando el usuario lo desea
  const { eliminarProducto } = useContext(CarritoContext);
  
  // ========== CÁLCULO DEL SUBTOTAL ==========
  // Multiplica el precio unitario por la cantidad comprada
  // Ej: si precio es 500 y cantidad es 3, subtotal es 1500
  const subtotal = item.precio * cantidad;

  return (
    <div className="cart-item">
      
      {/* ========== COLUMNA 1: NOMBRE DEL PRODUCTO ========== */}
      {/* Muestra el nombre del instrumento que el usuario compró */}
      {/* Ej: "Guitarra Acústica", "Micrófono XM8", etc. */}
      <div className="item-name">
        <span className="product-name">{item.nombre}</span>
      </div>
      
      {/* ========== COLUMNA 2: PRECIO UNITARIO ========== */}
      {/* Muestra el precio individual del producto (sin multiplicar por cantidad) */}
      {/* Ej: $500 */}
      <div className="item-price">
        <span className="price-value">${item.precio}</span>
      </div>
      
      {/* ========== COLUMNA 3: CANTIDAD COMPRADA ========== */}
      {/* Muestra cuántas unidades de este producto hay en el carrito */}
      {/* Ej: 3 (significa que compró 3 unidades del mismo producto) */}
      <div className="item-quantity">
        <span className="qty-badge">{cantidad}</span>
      </div>
      
      {/* ========== COLUMNA 4: SUBTOTAL ========== */}
      {/* Muestra el total para este producto: precio × cantidad */}
      {/* Ej: si precio es 500 y cantidad es 3, muestra $1500 */}
      <div className="item-subtotal">
        <span className="subtotal-value">${subtotal}</span>
      </div>
      
      {/* ========== COLUMNA 5: BOTÓN DE ELIMINAR ========== */}
      {/* Botón de papelera que elimina este producto del carrito */}
      {/* Cuando se hace click, ejecuta eliminarProducto(item.id) del contexto */}
      <div className="item-actions">
        <button 
          onClick={() => eliminarProducto(item.id)} 
          className="btn-remove"
          title="Eliminar del carrito"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
