import React, { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

/**
 * Componente Cart
 * 
 * Propósito: Mostrar el carrito de compras del usuario
 * Permite ver todos los productos agregados, cantidades, y totales
 * Ofrece opciones para: vaciar carrito, continuar comprando, o ir a checkout
 * 
 * No recibe props directamente, obtiene datos del CarritoContext
 */
const Cart = () => {
  // ========== CONTEXTO GLOBAL ==========
  // Obtiene del CarritoContext:
  // - carrito: array con todos los productos (estructura: {item: {id, nombre, precio}, cantidad})
  // - vaciarCarrito: función para limpiar todo el carrito
  // - total: suma de precios de todos los productos
  // - cantidadTotal: cantidad total de unidades en el carrito
  const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(
    CarritoContext
  );

  // ========== PANTALLA DE CARRITO VACÍO ==========
  // Si no hay productos en el carrito, muestra mensaje y botón para seguir comprando
  if (cantidadTotal === 0) {
    return (
      <div className="cart-empty-container">
        <div className="empty-state">
          {/* Emoji decorativo */}
          <div className="empty-icon">🛒</div>
          
          {/* Mensaje cuando carrito está vacío */}
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra</p>
          
          {/* Link para volver a la tienda */}
          <Link to="/" className="btn-continue-shopping">
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  // ========== PANTALLA DE CARRITO CON PRODUCTOS ==========
  return (
    <div className="cart-container">
      <h1 className="cart-title">Mi Carrito 🛒</h1>
      
      <div className="cart-wrapper">
        {/* ========== SECCIÓN 1: LISTA DE PRODUCTOS ========== */}
        {/* Muestra todos los productos en el carrito con detalles */}
        <div className="cart-items-section">
          
          {/* Encabezados de las columnas */}
          <div className="cart-items-header">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
          </div>
          
          {/* Mapea cada producto del carrito y renderiza un CartItem por cada uno */}
          {/* CartItem recibe {item: {id, nombre, precio}, cantidad} */}
          {/* El operador ... (spread) envía estas propiedades como argumentos individuales */}
          {carrito.map((producto) => (
            <CartItem key={producto.item.id} {...producto} />
          ))}
        </div>

        {/* ========== SECCIÓN 2: RESUMEN Y ACCIONES ==========  */}
        {/* Panel lateral con totales y opciones de acción */}
        <div className="cart-summary">
          <h3>Resumen de Compra</h3>
          
          {/* ========== BLOQUE 1: DESGLOSE DE PRECIOS ========== */}
          {/* Muestra subtotal, envío e impuestos */}
          <div className="summary-items">
            
            {/* Línea 1: Productos (cantidad y precio total) */}
            <div className="summary-row">
              <span>Productos ({cantidadTotal}):</span>
              <span className="amount">${total}</span>
            </div>
            
            {/* Línea 2: Envío (gratis en este e-commerce) */}
            <div className="summary-row">
              <span>Envío:</span>
              <span className="amount">Gratis</span>
            </div>
            
            {/* Línea 3: Impuestos (incluidos en el precio) */}
            <div className="summary-row">
              <span>Impuestos:</span>
              <span className="amount">Incluidos</span>
            </div>
          </div>

          {/* ========== BLOQUE 2: TOTAL FINAL ========== */}
          {/* Monto total a pagar (suma de todos los productos) */}
          <div className="summary-total">
            <span>Total:</span>
            <span className="total-amount">${total}</span>
          </div>

          {/* ========== BLOQUE 3: BOTÓN PARA IR A CHECKOUT ========== */}
          {/* Link que lleva al formulario de compra (Checkout) */}
          <Link to="/checkout" className="btn-checkout">
            Ir al Checkout →
          </Link>

          {/* ========== BLOQUE 4: BOTÓN PARA VACIAR CARRITO ========== */}
          {/* Al hacer click, ejecuta vaciarCarrito() que limpia el contexto */}
          <button 
            onClick={() => vaciarCarrito()} 
            className="btn-clear-cart"
          >
            Vaciar Carrito
          </button>

          {/* ========== BLOQUE 5: BOTÓN PARA SEGUIR COMPRANDO ========== */}
          {/* Link que vuelve a la página principal */}
          <Link to="/" className="btn-continue">
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
