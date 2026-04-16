import React, { useContext } from "react"; // Importa useContext desde React
import { CarritoContext } from "../Context/CarritoContext";

const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(CarritoContext);

  return (
    <div key={item.id}> {/* Agrega una prop 'key' única */}
      <h4> {item.nombre} </h4>
      <p> Cantidad: {cantidad} </p>
      <p> Precio: {item.precio} </p>
      <button onClick={() => eliminarProducto(item.id)}> Eliminar </button>
      <hr />
    </div>
  );
};

export default CartItem;
