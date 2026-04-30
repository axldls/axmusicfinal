import "./Item.css"
import { Link } from 'react-router-dom'

/**
 * Componente Item
 * 
 * Propósito: Mostrar un producto individual en formato de tarjeta
 * Cada Item es clickeable y lleva al detalle completo del producto
 * 
 * Props recibidas:
 * - id: identificador único del producto (viene de Firebase)
 * - nombre: título del producto (viene de Firebase)
 * - precio: valor unitario (viene de Firebase)
 * - img: URL de la imagen del producto (viene de Firebase)
 */
const Item = ({id, nombre, precio, img}) => {
  return (
    // ========== LINK A DETALLE DEL PRODUCTO ==========
    // Navega a la página de detalle del producto usando React Router
    // URL: /Item/{id} donde id es el identificador único
    <Link to={`/Item/${id}`} className="item-link">
      
      <div className="item">
        
        {/* ========== IMAGEN DEL PRODUCTO ========== */}
        {/* Muestra la foto del instrumento musical desde la URL de Firebase */}
        <img className="imgProducto" src={img} alt={nombre} />
        
        {/* ========== NOMBRE DEL PRODUCTO ========== */}
        {/* Título del instrumento (ej: "Guitarra Acústica", "Micrófono XM8") */}
        <h3>Nombre: {nombre} </h3>
        
        {/* ========== PRECIO ========== */}
        {/* Valor unitario del producto en pesos (ej: $1500) */}
        <p> Precio: {precio} </p>
        
        {/* ========== ID DEL PRODUCTO ========== */}
        {/* Identificador único en la BD (útil para debugging) */}
        <p> ID: {id} </p>
        
        {/* ========== BOTÓN DE ACCIÓN ========== */}
        {/* Al hacer click en esta tarjeta, se va al ItemDetailContainer */}
        {/* que carga los datos completos del producto desde Firebase */}
        <button className="btn-ver-detalles">Ver Detalles</button>
      </div>
    </Link>
  )
}

export default Item