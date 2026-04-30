import React from 'react'
import { useState } from 'react'
import './ItemCount.css'

/**
 * Componente ItemCount
 * 
 * Propósito: Selector interactivo de cantidad de unidades a comprar
 * Permite aumentar/disminuir cantidad respetando el stock disponible
 * Se usa en ItemDetail para que el usuario elija cuánto quiere comprar
 * 
 * Props recibidas:
 * - inicial: cantidad inicial del contador (normalmente 1)
 * - stock: cantidad máxima de unidades disponibles (del producto en Firebase)
 * - funcionAgregar: callback que se ejecuta cuando el usuario confirma cantidad
 *   (Viene de ItemDetail.jsx como manejadorCantidad)
 */
const ItemCount = ({inicial, stock, funcionAgregar}) => {
    
    // ========== ESTADO LOCAL ==========
    // contador: almacena el número de unidades que el usuario seleccionó
    // Se inicializa con el valor de la prop "inicial"
    const [contador, setContador] = useState(inicial);

    /**
     * incrementar
     * 
     * Qué hace: Aumenta el contador en 1 si no hemos alcanzado el stock máximo
     * 
     * Lógica:
     * 1. Verifica que contador < stock (no ha superado el máximo disponible)
     * 2. Si es verdadero, suma 1 al contador
     * 3. Si es falso, no hace nada (el botón está disabled)
     */
    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }
    
    /**
     * decrementar
     * 
     * Qué hace: Disminuye el contador en 1 si no hemos llegado al mínimo
     * 
     * Lógica:
     * 1. Verifica que contador > inicial (no hemos vuelto al mínimo)
     * 2. Si es verdadero, resta 1 al contador
     * 3. Si es falso, no hace nada (el botón está disabled)
     * 
     * Nota: No baja de "inicial" (normalmente 1) para evitar cantidad negativa
     */
    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }

  return (
    <div className='item-count-container'>
      
      {/* ========== SELECTOR DE CANTIDAD ========== */}
      {/* Panel con botones +/- y display del número actual */}
      <div className='quantity-selector'>
        
        {/* Botón DISMINUIR (-) */}
        {/* disabled={contador === inicial} desactiva el botón si ya está en el mínimo */}
        <button 
          className='quantity-btn decrease'
          onClick={decrementar}
          disabled={contador === inicial}
        >
          −
        </button>
        
        {/* DISPLAY DE CANTIDAD */}
        {/* Muestra el número actual de unidades seleccionadas */}
        <div className='quantity-display'>
          <span className='quantity-value'>{contador}</span>
          {/* Texto que dice "unidad" o "unidades" según cantidad */}
          <span className='quantity-label'>unidad{contador > 1 ? 'es' : ''}</span>
        </div>
        
        {/* Botón AUMENTAR (+) */}
        {/* disabled={contador >= stock} desactiva el botón si llegó al máximo disponible */}
        <button 
          className='quantity-btn increase'
          onClick={incrementar}
          disabled={contador >= stock}
        >
          +
        </button>
      </div>
      
      {/* ========== BOTÓN CONFIRMAR CANTIDAD ========== */}
      {/* Al hacer click, ejecuta funcionAgregar(contador) */}
      {/* funcionAgregar viene de ItemDetail y agrega el producto al carrito */}
      {/* El contador mantiene el valor seleccionado para pasar a ItemDetail */}
      <button 
        className='btn-add-cart'
        onClick={() => funcionAgregar(contador)}
      >
        🛒 Agregar al Carrito
      </button>
    </div>
  )
}

export default ItemCount