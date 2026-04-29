import React, { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(
    CarritoContext
  );

  if (cantidadTotal === 0) {
    return (
      <div className="cart-empty-container">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra</p>
          <Link to="/" className="btn-continue-shopping">
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Mi Carrito 🛒</h1>
      
      <div className="cart-wrapper">
        {/* Lista de productos */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
          </div>
          
          {carrito.map((producto) => (
            <CartItem key={producto.item.id} {...producto} />
          ))}
        </div>

        {/* Resumen de compra */}
        <div className="cart-summary">
          <h3>Resumen de Compra</h3>
          
          <div className="summary-items">
            <div className="summary-row">
              <span>Productos ({cantidadTotal}):</span>
              <span className="amount">${total}</span>
            </div>
            <div className="summary-row">
              <span>Envío:</span>
              <span className="amount">Gratis</span>
            </div>
            <div className="summary-row">
              <span>Impuestos:</span>
              <span className="amount">Incluidos</span>
            </div>
          </div>

          <div className="summary-total">
            <span>Total:</span>
            <span className="total-amount">${total}</span>
          </div>

          <Link to="/checkout" className="btn-checkout">
            Ir al Checkout →
          </Link>

          <button 
            onClick={() => vaciarCarrito()} 
            className="btn-clear-cart"
          >
            Vaciar Carrito
          </button>

          <Link to="/" className="btn-continue">
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
