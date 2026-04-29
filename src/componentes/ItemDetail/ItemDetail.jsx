import React, { useState } from 'react';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { useContext } from 'react';
import { CarritoContext } from '../Context/CarritoContext';

const ItemDetail = ({ id, nombre, precio, img, stock }) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const {agregarProducto} = useContext(CarritoContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    const item = {id, nombre, precio};
    agregarProducto(item, cantidad)
  };

  const precioDescuento = Math.round(precio * 0.85);

  return (
    <div className='item-detail-container'>
      <div className='item-detail-wrapper'>
        {/* Sección de imagen */}
        <div className='detail-image-section'>
          <img src={img} alt={nombre} className='item-detail-image' />
          <div className='image-badges'>
            <span className='badge-oficial'>✓ Producto Verificado</span>
          </div>
        </div>

        {/* Sección de detalles */}
        <div className='detail-info-section'>
          
          {/* Rating */}
          <div className='rating-section'>
            <div className='stars'>★★★★★</div>
            <span className='rating-count'>(248 reseñas)</span>
          </div>

          {/* Título y ID */}
          <h1 className='item-detail-title'>{nombre}</h1>
          <p className='item-id'>SKU: {id}</p>

          {/* Precio */}
          <div className='price-section'>
            <span className='original-price'>${precio}</span>
            <span className='discount-badge'>-15%</span>
            <h2 className='final-price'>${precioDescuento}</h2>
            <p className='price-info'>Por solo 3 cuotas de ${Math.round(precioDescuento / 3)}</p>
          </div>

          {/* Stock */}
          <div className='stock-section'>
            {stock > 0 ? (
              <div className='stock-available'>
                <span className='stock-icon'>✓</span>
                <span>Stock disponible: <strong>{stock} unidades</strong></span>
              </div>
            ) : (
              <div className='stock-unavailable'>
                <span className='stock-icon'>✕</span>
                <span>Sin stock disponible</span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className='description-section'>
            <h3>Características principales:</h3>
            <ul className='features-list'>
              <li>Instrumentos de alta calidad</li>
              <li>Garantía de 1 año</li>
              <li>Envío gratis a todo el país</li>
              <li>Compra protegida</li>
            </ul>
          </div>

          {/* Información de envío */}
          <div className='shipping-info'>
            <div className='shipping-item'>
              <span className='shipping-icon'>📦</span>
              <div>
                <p className='shipping-title'>Envío gratis</p>
                <p className='shipping-detail'>Llega en 3-5 días hábiles</p>
              </div>
            </div>
            <div className='shipping-item'>
              <span className='shipping-icon'>🛡️</span>
              <div>
                <p className='shipping-title'>Compra Protegida</p>
                <p className='shipping-detail'>Devuelve tu dinero si no lo recibes</p>
              </div>
            </div>
          </div>

          {/* Información del vendedor */}
          <div className='seller-info'>
            <h4>Vendedor: AxMusic</h4>
            <p>Reputación: ★★★★★ Excelente</p>
          </div>

          {/* Selector de cantidad y botones */}
          <div className='action-section'>
            {agregarCantidad > 0 ? (
              <Link to="/cart" className='btn-checkout'>
                🛒 Ir al Carrito ({agregarCantidad})
              </Link>
            ) : (
              <>
                <ItemCount
                  inicial={1}
                  stock={stock}
                  funcionAgregar={manejadorCantidad}
                />
              </>
            )}
          </div>

          {/* Botones adicionales */}
          <div className='additional-actions'>
            <button className='btn-wishlist'>❤️ Agregar a favoritos</button>
            <button className='btn-share'>📤 Compartir</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
