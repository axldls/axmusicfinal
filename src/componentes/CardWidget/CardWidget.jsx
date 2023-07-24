import "./CardWidget.css";
import { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link } from "react-router-dom";

const CardWidget = () => {
  const {cantidadTotal} = useContext(CarritoContext)
    const imgCarrito = "https://cdn-icons-png.flaticon.com/512/5087/5087847.png"
  return (
    <div>
        <Link to="/cart"> <img className="imgCarrito" src={imgCarrito} alt="Carrito" />
       {
        cantidadTotal > 0 && <strong> {cantidadTotal} </strong>
       }
      </Link>
    </div>
  )
}

export default CardWidget