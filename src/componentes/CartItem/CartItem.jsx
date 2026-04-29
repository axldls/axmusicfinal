import React, { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import "./CartItem.css";

const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(CarritoContext);
  const subtotal = item.precio * cantidad;

  return (
    <div className="cart-item">
      <div className="item-name">
        <span className="product-name">{item.nombre}</span>
      </div>
      <div className="item-price">
        <span className="price-value">${item.precio}</span>
      </div>
      <div className="item-quantity">
        <span className="qty-badge">{cantidad}</span>
      </div>
      <div className="item-subtotal">
        <span className="subtotal-value">${subtotal}</span>
      </div>
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
