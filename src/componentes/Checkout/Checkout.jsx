import React, { useState, useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { db } from "../services/config";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
    const { carrito, vaciarCarrito, total } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");
    const [totalPedido, setTotalPedido] = useState(0);

    const manejadorFormulario = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion || !direccion || !ciudad || !codigoPostal) {
            setError("Por favor completa todos los campos");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los emails no coinciden");
            return;
        }

        const orden = {
            items: carrito.map((producto) => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
                precio: producto.item.precio
            })),
            total: total, 
            nombre,
            apellido,
            telefono,
            email,
            direccion,
            ciudad,
            codigoPostal,
            fecha: new Date().toLocaleDateString(),
        };

        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.log("Error al crear la orden:", error);
                setError("Se produjo un error al procesar tu compra. Intenta nuevamente.");
            });
    };

    if (ordenId) {
        return (
            <div className="checkout-container">
                <div className="order-success">
                    <div className="success-icon">✓</div>
                    <h1>¡Gracias por tu compra!</h1>
                    <p className="order-number">Número de orden: <strong>{ordenId}</strong></p>
                    <div className="success-details">
                        <p>Te hemos enviado una confirmación a tu email</p>
                        <p>Recibirás tu compra en 3-5 días hábiles</p>
                        <p className="total-paid">Total pagado: <strong>${total}</strong></p>
                    </div>
                    <Link to="/" className="btn-back-home">
                        ← Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-wrapper">
                {/* Sección del formulario */}
                <div className="checkout-form-section">
                    <h1>Completa tu compra 🛍️</h1>
                    
                    <form className="checkout-form" onSubmit={manejadorFormulario}>
                        {/* Datos personales */}
                        <div className="form-section">
                            <h3 className="section-title">Datos Personales</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre *</label>
                                    <input 
                                        type="text" 
                                        value={nombre} 
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Juan"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido *</label>
                                    <input 
                                        type="text" 
                                        value={apellido} 
                                        onChange={(e) => setApellido(e.target.value)}
                                        placeholder="García"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Teléfono *</label>
                                <input 
                                    type="tel" 
                                    value={telefono} 
                                    onChange={(e) => setTelefono(e.target.value)}
                                    placeholder="+54 11 2345-6789"
                                />
                            </div>
                        </div>

                        {/* Dirección de envío */}
                        <div className="form-section">
                            <h3 className="section-title">Dirección de Envío</h3>
                            <div className="form-group">
                                <label>Dirección *</label>
                                <input 
                                    type="text" 
                                    value={direccion} 
                                    onChange={(e) => setDireccion(e.target.value)}
                                    placeholder="Calle Principal 123"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ciudad *</label>
                                    <input 
                                        type="text" 
                                        value={ciudad} 
                                        onChange={(e) => setCiudad(e.target.value)}
                                        placeholder="Buenos Aires"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Código Postal *</label>
                                    <input 
                                        type="text" 
                                        value={codigoPostal} 
                                        onChange={(e) => setCodigoPostal(e.target.value)}
                                        placeholder="1425"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-section">
                            <h3 className="section-title">Email</h3>
                            <div className="form-group">
                                <label>Email *</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirmar Email *</label>
                                <input 
                                    type="email" 
                                    value={emailConfirmacion} 
                                    onChange={(e) => setEmailConfirmacion(e.target.value)}
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        {/* Errores */}
                        {error && <div className="error-message">⚠️ {error}</div>}

                        <button type="submit" className="btn-submit">
                            Confirmar Compra
                        </button>
                    </form>
                </div>

                {/* Resumen del pedido */}
                <div className="checkout-summary">
                    <h3>Resumen del Pedido</h3>
                    
                    <div className="order-items">
                        {carrito.map((producto) => (
                            <div key={producto.item.id} className="order-item">
                                <div className="order-item-info">
                                    <p className="item-name">{producto.item.nombre}</p>
                                    <p className="item-qty">Cantidad: {producto.cantidad}</p>
                                </div>
                                <p className="item-price">${producto.item.precio * producto.cantidad}</p>
                            </div>
                        ))}
                    </div>

                    <div className="summary-breakdown">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${total}</span>
                        </div>
                        <div className="summary-row">
                            <span>Envío:</span>
                            <span className="free-shipping">Gratis</span>
                        </div>
                        <div className="summary-row">
                            <span>Impuestos:</span>
                            <span>Incluidos</span>
                        </div>
                    </div>

                    <div className="summary-total">
                        <span>Total:</span>
                        <span className="total-price">${total}</span>
                    </div>

                    <div className="payment-methods">
                        <h4>Métodos de Pago</h4>
                        <div className="payment-icons">
                            <div className="payment-method">💳 Tarjeta</div>
                            <div className="payment-method">🏦 Transferencia</div>
                            <div className="payment-method">📱 Billetera</div>
                        </div>
                    </div>

                    <p className="security-notice">
                        🔒 Tu información está protegida y encriptada
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
