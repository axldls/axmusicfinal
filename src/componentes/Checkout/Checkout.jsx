import React, { useState, useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { db } from "../services/config";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Checkout.css";

/**
 * Componente Checkout
 * 
 * Propósito: Mostrar el formulario de compra y confirmación de la orden
 * Permite a los usuarios completar sus datos y confirmar su compra
 */
const Checkout = () => {
    // ============ CONTEXTO ============
    // Obtiene del CarritoContext: 
    // - carrito: array de productos agregados al carrito (estructura: {item: {id, nombre, precio}, cantidad})
    // - vaciarCarrito: función para limpiar el carrito después de comprar
    // - total: precio total calculado en el contexto
    const { carrito, vaciarCarrito, total } = useContext(CarritoContext);

    // ============ ESTADOS DEL FORMULARIO ============
    // Almacenan los datos personales del usuario mientras escribe
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    
    // ============ ESTADOS DE CONTROL ============
    // error: almacena mensajes de error a mostrar si la validación falla
    // ordenId: almacena el ID de la orden creada en Firebase (cuando es diferente de "", muestra pantalla de éxito)
    // totalPedido: guarda el total ANTES de vaciar el carrito para mostrarlo en la confirmación
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");
    const [totalPedido, setTotalPedido] = useState(0);

    /**
     * manejadorFormulario
     * 
     * Propósito: Procesa el envío del formulario de compra
     * Qué hace:
     *   1. Valida que todos los campos estén completos
     *   2. Valida que los emails coincidan
     *   3. Construye un objeto con los datos de la orden
     *   4. Guarda la orden en Firebase Firestore
     *   5. Vacía el carrito después de confirmar
     * 
     * Datos recibidos: ninguno, pero usa los estados locales del componente
     * Datos enviados: la orden se guarda en la colección "ordenes" de Firebase
     */
    const manejadorFormulario = (e) => {
        // Previene el recargo de la página al enviar el formulario
        e.preventDefault();

        // ============ VALIDACIÓN 1: Campos obligatorios ============
        // Comprueba que ningún campo esté vacío
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion || !direccion || !ciudad || !codigoPostal) {
            setError("Por favor completa todos los campos");
            return;
        }

        // ============ VALIDACIÓN 2: Confirmación de email ============
        // Verifica que los dos emails ingresados sean idénticos
        if (email !== emailConfirmacion) {
            setError("Los emails no coinciden");
            return;
        }

        // ============ GUARDAR TOTAL ANTES DE VACIAR CARRITO ============
        // Guarda el total en el estado para poder mostrarlo después en la confirmación
        // (el contexto limpiará este valor cuando se vacíe el carrito)
        setTotalPedido(total);

        // ============ CONSTRUIR OBJETO DE ORDEN ============
        // Estructura los datos para guardar en Firebase
        const orden = {
            // Mapea cada producto del carrito con sus datos relevantes
            items: carrito.map((producto) => ({
                id: producto.item.id,                    // ID único del producto
                nombre: producto.item.nombre,            // Nombre del producto
                cantidad: producto.cantidad,             // Cantidad comprada
                precio: producto.item.precio             // Precio unitario
            })),
            total: total,                                // Total de la compra (viene del contexto)
            nombre,                                      // Datos personales del comprador
            apellido,
            telefono,
            email,
            direccion,                                   // Datos de envío
            ciudad,
            codigoPostal,
            fecha: new Date().toLocaleDateString(),      // Fecha de la compra (formato local)
        };

        // ============ GUARDAR EN FIREBASE FIRESTORE ============
        // Guarda la orden en la colección "ordenes" de Firebase
        // addDoc genera automáticamente un ID único para el documento
        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                // Si la orden se guardó exitosamente:
                setOrdenId(docRef.id);   // Guarda el ID para mostrarlo en la confirmación
                vaciarCarrito();         // Limpia el carrito del contexto
            })
            .catch((error) => {
                // Si hay error al guardar:
                console.log("Error al crear la orden:", error);
                setError("Se produjo un error al procesar tu compra. Intenta nuevamente.");
            });
    };

    // ============ PANTALLA DE CONFIRMACIÓN ============
    // Si ordenId existe, significa que la orden se creó exitosamente en Firebase
    // Muestra pantalla de éxito en lugar del formulario
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
                        <p className="total-paid">Total pagado: <strong>${totalPedido}</strong></p>
                    </div>
                    <Link to="/" className="btn-back-home">
                        ← Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    // ============ PANTALLA DEL FORMULARIO ============
    // Muestra el formulario de compra mientras no haya orden confirmada
    // Se divide en dos secciones: formulario (izquierda) y resumen (derecha)
    return (
        <div className="checkout-container">
            <div className="checkout-wrapper">
                
                {/* ========== SECCIÓN 1: FORMULARIO DE DATOS ========== */}
                <div className="checkout-form-section">
                    <h1>Completa tu compra 🛍️</h1>
                    
                    <form className="checkout-form" onSubmit={manejadorFormulario}>
                        
                        {/* ========== BLOQUE 1: DATOS PERSONALES ========== */}
                        {/* Captura nombre, apellido y teléfono del comprador */}
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

                        {/* ========== BLOQUE 2: DIRECCIÓN DE ENVÍO ========== */}
                        {/* Captura la dirección, ciudad y código postal para enviar la compra */}
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

                        {/* ========== BLOQUE 3: EMAIL ========== */}
                        {/* Captura el email del comprador y pide confirmación para evitar errores */}
                        {/* Se valida en el manejador que ambos emails sean idénticos */}
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

                        {/* ========== BLOQUE 4: MENSAJES DE ERROR ========== */}
                        {/* Muestra errores de validación si los hay (campos vacíos, emails no coinciden, etc.) */}
                        {/* Solo se muestra si la variable error contiene un mensaje */}
                        {error && <div className="error-message">⚠️ {error}</div>}

                        {/* ========== BLOQUE 5: BOTÓN DE ENVÍO ========== */}
                        {/* Al hacer click, ejecuta manejadorFormulario que valida y guarda la orden en Firebase */}
                        <button type="submit" className="btn-submit">
                            Confirmar Compra
                        </button>
                    </form>
                </div>

                {/* ========== SECCIÓN 2: RESUMEN DE PEDIDO ========== */}
                {/* Muestra en tiempo real los productos en el carrito y el total a pagar */}
                {/* Se actualiza automáticamente cuando se agrega/quita productos */}
                <div className="checkout-summary">
                    <h3>Resumen del Pedido</h3>
                    
                    {/* ========== BLOQUE 1: LISTA DE PRODUCTOS ========== */}
                    {/* Itera sobre cada producto en el carrito (obtenido del CarritoContext) */}
                    {/* Para cada producto, muestra: nombre, cantidad, precio unitario y precio total */}
                    {/* Estructura del carrito: cada elemento tiene {item: {id, nombre, precio}, cantidad} */}
                    <div className="order-items">
                        {carrito.map((producto) => (
                            <div key={producto.item.id} className="order-item">
                                <div className="order-item-info">
                                    <p className="item-name">{producto.item.nombre}</p>
                                    <p className="item-qty">Cantidad: {producto.cantidad}</p>
                                </div>
                                {/* Calcula: precio unitario × cantidad comprada */}
                                <p className="item-price">${producto.item.precio * producto.cantidad}</p>
                            </div>
                        ))}
                    </div>

                    {/* ========== BLOQUE 2: DESGLOSE DEL PRECIO ========== */}
                    {/* Muestra el breakdown: subtotal, envío (gratis) e impuestos (incluidos) */}
                    {/* El total viene del CarritoContext que calcula automáticamente la suma */}
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

                    {/* ========== BLOQUE 3: TOTAL FINAL ========== */}
                    {/* Muestra el monto total a pagar */}
                    {/* Este valor viene del CarritoContext (total) que suma todos los productos */}
                    <div className="summary-total">
                        <span>Total:</span>
                        <span className="total-price">${total}</span>
                    </div>

                    {/* ========== BLOQUE 4: MÉTODOS DE PAGO DISPONIBLES ========== */}
                    {/* Muestra las opciones de pago (informativo, aún no funcional) */}
                    <div className="payment-methods">
                        <h4>Métodos de Pago</h4>
                        <div className="payment-icons">
                            <div className="payment-method">💳 Tarjeta</div>
                            <div className="payment-method">🏦 Transferencia</div>
                            <div className="payment-method">📱 Billetera</div>
                        </div>
                    </div>

                    {/* ========== BLOQUE 5: NOTICE DE SEGURIDAD ========== */}
                    {/* Mensaje informativo sobre protección de datos y encriptación */}
                    <p className="security-notice">
                        🔒 Tu información está protegida y encriptada
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
