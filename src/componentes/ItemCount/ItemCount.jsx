import React from 'react'
import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({inicial, stock, funcionAgregar}) => {
    const [contador, setContador] = useState(inicial);

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }
    
    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }

  return (
    <div className='item-count-container'>
      <div className='quantity-selector'>
        <button 
          className='quantity-btn decrease'
          onClick={decrementar}
          disabled={contador === inicial}
        >
          −
        </button>
        <div className='quantity-display'>
          <span className='quantity-value'>{contador}</span>
          <span className='quantity-label'>unidad{contador > 1 ? 'es' : ''}</span>
        </div>
        <button 
          className='quantity-btn increase'
          onClick={incrementar}
          disabled={contador >= stock}
        >
          +
        </button>
      </div>
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