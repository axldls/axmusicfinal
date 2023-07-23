import React from 'react'

const ItemDetail = ({id, nombre, precio, img}) => {
  return (
    <div>
        <h2>Nombre {nombre} </h2>
        <h3>Precio: {precio} </h3>
        <h3>ID: {id} </h3>
        <p>Lorem ipsum dolor sit.</p>
    </div>
  )
}

export default ItemDetail