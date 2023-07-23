import "./CardWidget.css"

const CardWidget = () => {

    const imgCarrito = "https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
  return (
    <div>
        <img className="imgCarrito" src={imgCarrito} alt="Carrito" />
        <strong> 10 </strong>
    </div>
  )
}

export default CardWidget