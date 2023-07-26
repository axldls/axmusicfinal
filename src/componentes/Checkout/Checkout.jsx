import { useState, useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { db } from "../services/config";
import { collection, doc, addDoc } from "firebase/firestore";
import "./Checkout.css";

const Checkout = () => {
    const {carrito, vaciarCarrito, cantidadTotal, total} = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");


    const manejadorFormulario = (e) => {
        e.preventDefault();

        if(!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Completa los campos o algo malo te pasara...");
            return;
        }

        if(email !== emailConfirmacion) {
            setError("los campos no coinciden, inutil!!");
            return;
        }
        const orden = {
            items: carrito.map ( producto => ({
                id: producto.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
        })),
        total: cantidadTotal,
        nombre,
        apellido,
        telefono,
        email
        };

addDoc(collection(db, "ordenes"), orden)
  .then((docRef) => {
    setOrdenId(docRef.id);
    vaciarCarrito();
  })
  .catch((error) => {
    console.log("Error al ingresar tu orden :C", error);
    setError("Se produjo un error al crear la orden, que pena capo!");
  });
    }

  return (
    <div>
        <h2>Tus datos</h2>
        <form onSubmit={manejadorFormulario}>
            {carrito.map(producto => (
                <div>
                    <p>
                        {producto.item.nombre} x {producto.cantidad}
                    </p>
                    <p>Precio $ {producto.item.precio}
                     </p>
                     <p>
                        Total: {producto.item.total}
                     </p>
                    <hr />
                </div>
            ))}
            <hr />

            <div>
                <label htmlFor=""> Nombre </label>
                <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>

            <div>
                <label htmlFor=""> Apellido </label>
                <input type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)}/>
            </div>

            <div>
                <label htmlFor=""> Telefono </label>
                <input type="text" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
            </div>

            <div>
                <label htmlFor=""> Email </label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div>
                <label htmlFor=""> Email Confirmacion</label>
                <input type="email" value={emailConfirmacion} onChange={(e)=>setEmailConfirmacion(e.target.value)}/>
            </div>

            {
                error && <p style={{color:"green"}}> {error} </p>
            }
            <button type="submit"> Finalizar Compra!</button>
        </form>
        {
            ordenId && (
                <strong>¡Gracias por tu compra! Tu numero de compra es {ordenId} </strong>
            )
        }
    </div>
  )
}

export default Checkout