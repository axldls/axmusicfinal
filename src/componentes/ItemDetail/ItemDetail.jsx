import React, { useState } from 'react';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { useContext } from 'react';
import { CarritoContext } from '../Context/CarritoContext';

/**
 * Componente ItemDetail
 * 
 * Propósito: Mostrar la vista detallada completa de un producto
 * Incluye: imagen, precio con descuento, stock, características, y selector de cantidad
 * 
 * Props recibidas (todas vienen de Firebase a través de ItemDetailContainer):
 * - id: identificador único del producto
 * - nombre: título del producto
 * - precio: precio original sin descuento
 * - img: URL de la imagen
 * - stock: cantidad disponible en inventario
 */
const ItemDetail = ({ id, nombre, precio, img, stock }) => {
  // ========== ESTADO LOCAL ==========
  // agregarCantidad: almacena cuántos productos el usuario seleccionó para comprar
  // Se inicializa en 0 (no hay cantidad seleccionada)
  // Se actualiza cuando el usuario interactúa con ItemCount
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  // ========== CONTEXTO GLOBAL ==========
  // Obtiene la función agregarProducto del CarritoContext
  // Esta función agrega el producto al carrito global cuando el usuario lo confirma
  const {agregarProducto} = useContext(CarritoContext);

  /**
   * manejadorCantidad
   * 
   * Qué hace: Procesa cuando el usuario confirma la cantidad y agrega al carrito
   * 
   * Parámetro recibido: 
   * - cantidad: número seleccionado por el usuario en ItemCount
   * 
   * Proceso:
   * 1. Guarda la cantidad en el estado local
   * 2. Crea un objeto item con id, nombre y precio
   * 3. Llama a agregarProducto del contexto para agregarlo al carrito global
   */
  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    const item = {id, nombre, precio};
    agregarProducto(item, cantidad)
  };

  // ========== CÁLCULO DE DESCUENTO ==========
  // Aplica 15% de descuento: multiplica por 0.85
  // Math.round redondea al número entero más cercano
  // Resultado: precio con descuento (ej: si original es 1000, descuento es 850)
  const precioDescuento = Math.round(precio * 0.85);

  return (
    <div className='item-detail-container'>
      <div className='item-detail-wrapper'>
        
        {/* ========== SECCIÓN 1: IMAGEN DEL PRODUCTO ========== */}
        {/* Muestra la foto grande del instrumento y un badge de verificación */}
        <div className='detail-image-section'>
          <img src={img} alt={nombre} className='item-detail-image' />
          <div className='image-badges'>
            {/* Badge que indica que el producto es verificado y confiable */}
            <span className='badge-oficial'>✓ Producto Verificado</span>
          </div>
        </div>

        {/* ========== SECCIÓN 2: INFORMACIÓN DEL PRODUCTO ========== */}
        <div className='detail-info-section'>
          
          {/* ========== BLOQUE 1: CALIFICACIÓN ========== */}
          {/* Muestra rating ficticio de 5 estrellas y cantidad de reseñas */}
          {/* En un proyecto real, estos datos vendrían de Firebase */}
          <div className='rating-section'>
            <div className='stars'>★★★★★</div>
            <span className='rating-count'>(248 reseñas)</span>
          </div>

          {/* ========== BLOQUE 2: TÍTULO E ID ========== */}
          {/* Nombre del producto (de la BD) y SKU (identificador del producto) */}
          <h1 className='item-detail-title'>{nombre}</h1>
          <p className='item-id'>SKU: {id}</p>

          {/* ========== BLOQUE 3: PRECIOS Y DESCUENTO ========== */}
          {/* Muestra precio original tachado, descuento, precio final y cuotas */}
          {/* El descuento es 15% calculado arriba */}
          <div className='price-section'>
            {/* Precio original sin descuento */}
            <span className='original-price'>${precio}</span>
            
            {/* Badge que indica el porcentaje de descuento */}
            <span className='discount-badge'>-15%</span>
            
            {/* Precio final después del descuento */}
            <h2 className='final-price'>${precioDescuento}</h2>
            
            {/* Información de cuotas: divide el precio por 3 */}
            <p className='price-info'>Por solo 3 cuotas de ${Math.round(precioDescuento / 3)}</p>
          </div>

          {/* ========== BLOQUE 4: DISPONIBILIDAD DE STOCK ========== */}
          {/* Verifica si hay stock disponible (prop stock viene de Firebase) */}
          {/* Muestra disponibilidad o mensaje de sin stock */}
          <div className='stock-section'>
            {stock > 0 ? (
              // Si hay stock
              <div className='stock-available'>
                <span className='stock-icon'>✓</span>
                <span>Stock disponible: <strong>{stock} unidades</strong></span>
              </div>
            ) : (
              // Si NO hay stock
              <div className='stock-unavailable'>
                <span className='stock-icon'>✕</span>
                <span>Sin stock disponible</span>
              </div>
            )}
          </div>

          {/* ========== BLOQUE 5: CARACTERÍSTICAS DEL PRODUCTO ========== */}
          {/* Lista de beneficios y características comunes a todos los productos */}
          {/* En un proyecto real, estas características vendrían del producto en Firebase */}
          <div className='description-section'>
            <h3>Características principales:</h3>
            <ul className='features-list'>
              <li>Instrumentos de alta calidad</li>
              <li>Garantía de 1 año</li>
              <li>Envío gratis a todo el país</li>
              <li>Compra protegida</li>
            </ul>
          </div>

          {/* ========== BLOQUE 6: INFORMACIÓN DE ENVÍO Y SEGURIDAD ========== */}
          {/* Muestra dos garantías importantes para el comprador */}
          <div className='shipping-info'>
            {/* Información de envío */}
            <div className='shipping-item'>
              <span className='shipping-icon'>📦</span>
              <div>
                <p className='shipping-title'>Envío gratis</p>
                <p className='shipping-detail'>Llega en 3-5 días hábiles</p>
              </div>
            </div>
            
            {/* Información de compra protegida */}
            <div className='shipping-item'>
              <span className='shipping-icon'>🛡️</span>
              <div>
                <p className='shipping-title'>Compra Protegida</p>
                <p className='shipping-detail'>Devuelve tu dinero si no lo recibes</p>
              </div>
            </div>
          </div>

          {/* ========== BLOQUE 7: INFORMACIÓN DEL VENDEDOR ========== */}
          {/* Muestra detalles del vendedor (AxMusic) */}
          <div className='seller-info'>
            <h4>Vendedor: AxMusic</h4>
            <p>Reputación: ★★★★★ Excelente</p>
          </div>

          {/* ========== BLOQUE 8: SELECTOR DE CANTIDAD ========== */}
          {/* Si el usuario ya seleccionó cantidad, muestra botón para ir al carrito */}
          {/* Si no, muestra el componente ItemCount para seleccionar cantidad */}
          <div className='action-section'>
            {agregarCantidad > 0 ? (
              // Si ya agregó cantidad, muestra link al carrito con badge de cantidad
              <Link to="/cart" className='btn-checkout'>
                🛒 Ir al Carrito ({agregarCantidad})
              </Link>
            ) : (
              // Si no agregó cantidad, muestra selector
              <>
                <ItemCount
                  inicial={1}
                  stock={stock}
                  funcionAgregar={manejadorCantidad}
                />
              </>
            )}
          </div>

          {/* ========== BLOQUE 9: BOTONES ADICIONALES ========== */}
          {/* Botones secundarios: agregar a favoritos y compartir (decorativos) */}
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
