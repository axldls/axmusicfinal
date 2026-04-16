import React, { useState, useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { db } from "../services/config";
import { collection, addDoc } from "firebase/firestore";
import "./Checkout.css";

const Checkout = () => {
    const { carrito, vaciarCarrito, total } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    const manejadorFormulario = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Completa los campos o algo malo te pasará...");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los campos de email no coinciden, inútil!!");
            return;
        }

        const orden = {
            items: carrito.map((producto) => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
            })),
            total: total, 
            nombre,
            apellido,
            telefono,
            email,
        };

        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.log("Error al ingresar tu orden :C", error);
                setError("Se produjo un error al crear la orden, qué pena capo!");
            });
    };

    return (
        <div className="container">
            <h2>Tus datos</h2>
            <form className="form-container" onSubmit={manejadorFormulario}>
                
                {carrito.map((producto) => (
                    <div key={producto.item.id}>
                        <p>
                            Producto: {producto.item.nombre} x {producto.cantidad}
                        </p>
                        <p>Precio: $ {producto.item.precio}</p>
                        <p>Total: {producto.item.total}</p>
                        <hr />
                    </div>
                ))}
                <hr />

                <div className="form-group">
                    <label htmlFor="">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Apellido</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Teléfono</label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Email Confirmación</label>
                    <input type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Finalizar Compra</button>
            </form>
            {ordenId && (
                <strong>¡Gracias por tu compra! Tu número de compra es {ordenId}</strong>
            )}
        </div>
    );
};

export default Checkout;
