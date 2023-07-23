import React, { useState } from 'react';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

const ItemDetail = ({ id, nombre, precio, img, stock }) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    console.log("Productos Agregados: " + cantidad);
  };

  return (
    <div className='item-detail-container'>
      <h2 className='item-detail-title'>Nombre: {nombre}</h2>
      <h3 className='item-detail-subtitle'>Precio: {precio}</h3>
      <h3 className='item-detail-subtitle'>ID: {id}</h3>
      <img src={img} alt={nombre} className='item-detail-image' />
      <p className='item-detail-description'>Lorem ipsum dolor sit.</p>
      {agregarCantidad > 0 ? (
        <Link to="/cart" className='item-detail-link'>
          Terminar Compra
        </Link>
      ) : (
        <ItemCount
          inicial={1}
          stock={stock}
          funcionAgregar={manejadorCantidad}
        />
      )}
    </div>
  );
};

export default ItemDetail;
