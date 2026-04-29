import "./Item.css"
import { Link } from 'react-router-dom'

const Item = ({id, nombre, precio, img}) => {
  return (
    <Link to={`/Item/${id}`} className="item-link">
      <div className="item">
        <img className="imgProducto" src={img} alt={nombre} />
        <h3>Nombre: {nombre} </h3>
        <p> Precio: {precio} </p>
        <p> ID: {id} </p>
        <button className="btn-ver-detalles">Ver Detalles</button>
      </div>
    </Link>
  )
}

export default Item