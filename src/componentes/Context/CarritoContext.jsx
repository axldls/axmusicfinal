import { useState, createContext } from "react";

/**
 * CarritoContext
 * 
 * Propósito: Contexto global que administra el estado del carrito de toda la aplicación
 * 
 * Este contexto permite que CUALQUIER componente acceda y modifique:
 * - Los productos en el carrito
 * - El total de dinero a pagar
 * - La cantidad total de unidades
 * 
 * Sin necesidad de pasar props entre componentes (prop drilling)
 */
export const CarritoContext = createContext({
    carrito: [],          // Array de productos agregados
    total: 0,             // Suma total de precios
    cantidadTotal: 0,     // Cantidad total de unidades
});

/**
 * CarritoProvider
 * 
 * Propósito: Proveedor del contexto que envuelve toda la aplicación
 * 
 * En App.jsx o main.jsx debe usarse así:
 * <CarritoProvider>
 *   <App />
 * </CarritoProvider>
 */
export const CarritoProvider = ({ children }) => {
    
    // ========== ESTADOS GLOBALES DEL CARRITO ==========
    
    // carrito: array que guarda los productos
    // Estructura de cada elemento: { item: {id, nombre, precio}, cantidad }
    // Ejemplo: [ { item: {id: "1", nombre: "Guitarra", precio: 1500}, cantidad: 2 } ]
    const [carrito, setCarrito] = useState([]);
    
    // total: suma del precio de todos los productos considerando cantidades
    // Se calcula como: Σ(precio × cantidad) para cada producto
    // Ejemplo si el carrito tiene "Guitarra $1500 × 2", total será 3000
    const [total, setTotal] = useState(0);
    
    // cantidadTotal: cantidad de unidades de TODOS los productos
    // Se usa para mostrar la cantidad en el icono del carrito en la navbar
    // Ejemplo: si hay 2 Guitarras y 3 Micrófonos, cantidadTotal es 5
    const [cantidadTotal, setCantidadTotal] = useState(0);

    // ========== DEBUG ==========
    // Imprime el carrito en consola cada vez que cambia
    // Útil para debugging pero se puede comentar en producción
    console.log(carrito);

    /**
     * agregarProducto
     * 
     * Propósito: Agregar un producto al carrito o aumentar su cantidad si ya existe
     * 
     * Parámetros:
     * - item: objeto con {id, nombre, precio}
     * - cantidad: número de unidades a agregar
     * 
     * Desde donde se llama:
     * - ItemDetail.jsx cuando el usuario hace click en "Agregar al Carrito"
     * 
     * Lógica:
     * 1. Busca si el producto ya existe en el carrito
     * 2. Si NO existe: lo agrega nuevo
     * 3. Si SÍ existe: aumenta la cantidad del existente
     * 4. Actualiza el total y la cantidadTotal
     */
    const agregarProducto = (item, cantidad) => {
        // ========== VERIFICAR SI EL PRODUCTO YA EXISTE ==========
        // Busca en el carrito si ya hay un producto con el mismo ID
        const productoExistente = carrito.find(prod => prod.item.id === item.id);

        // ========== CASO 1: PRODUCTO NO EXISTE (AGREGAR NUEVO) ==========
        if (!productoExistente) {
            // Agrega el nuevo producto al final del array
            // [...prev, ...] es spread syntax para copiar array anterior + elemento nuevo
            setCarrito(prev => [...prev, { item, cantidad }]);
            
            // Suma la cantidad a cantidadTotal
            setCantidadTotal(prev => prev + cantidad);
            
            // Suma al total: precio × cantidad
            setTotal(prev => prev + item.precio * cantidad);
        } 
        // ========== CASO 2: PRODUCTO YA EXISTE (AUMENTAR CANTIDAD) ==========
        else {
            // Map recorre cada producto y actualiza el que coincida con el ID
            const carritoActualizado = carrito.map(prod => {
                if (prod.item.id === item.id) {
                    // Devuelve el producto con cantidad aumentada
                    return { ...prod, cantidad: prod.cantidad + cantidad };
                } else {
                    // Devuelve el producto sin cambios
                    return prod;
                }
            });
            
            // Actualiza el carrito con el array modificado
            setCarrito(carritoActualizado);
            
            // Suma la nueva cantidad al total
            setCantidadTotal(prev => prev + cantidad);
            
            // Suma el nuevo monto al total: precio × cantidad agregada
            setTotal(prev => prev + item.precio * cantidad);
        }
    };

    /**
     * eliminarProducto
     * 
     * Propósito: Eliminar completamente un producto del carrito
     * 
     * Parámetro:
     * - id: identificador del producto a eliminar
     * 
     * Desde donde se llama:
     * - CartItem.jsx cuando el usuario hace click en el botón 🗑️
     * 
     * Lógica:
     * 1. Busca el producto por ID
     * 2. Lo extrae del carrito
     * 3. Actualiza el total y cantidadTotal restando los datos del producto eliminado
     */
    const eliminarProducto = (id) => {
        // ========== ENCONTRAR EL PRODUCTO A ELIMINAR ==========
        // Busca el producto completo para obtener su cantidad y precio
        const productoEliminado = carrito.find(prod => prod.item.id === id);
        
        // ========== CREAR NUEVO CARRITO SIN EL PRODUCTO ==========
        // Filter crea un nuevo array solo con productos que NO tienen el ID a eliminar
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id);
        
        // ========== ACTUALIZAR ESTADOS ==========
        // Actualiza el carrito sin el producto
        setCarrito(carritoActualizado);
        
        // Resta la cantidad del producto eliminado de cantidadTotal
        setCantidadTotal(prev => prev - productoEliminado.cantidad);
        
        // Resta el monto del producto eliminado del total
        // Monto = precio unitario × cantidad que había
        setTotal(prev => prev - productoEliminado.item.precio * productoEliminado.cantidad);
    };

    /**
     * vaciarCarrito
     * 
     * Propósito: Limpiar completamente el carrito después de una compra exitosa
     * 
     * Desde donde se llama:
     * - Checkout.jsx después de guardar la orden en Firebase
     * - Cart.jsx cuando el usuario hace click en "Vaciar Carrito"
     * 
     * Lógica:
     * Reinicia todos los estados a su valor inicial (vacío)
     */
    const vaciarCarrito = () => {
        // Elimina todos los productos
        setCarrito([]);
        
        // Reinicia la cantidad total a 0
        setCantidadTotal(0);
        
        // Reinicia el total a $0
        setTotal(0);
    };

    // ========== PROVEEDOR DEL CONTEXTO ==========
    // Value contiene el estado y las funciones disponibles para TODOS los componentes
    // children representa toda la aplicación envuelta por el provider
    return (
        <CarritoContext.Provider value={{ 
            carrito,              // Array de {item, cantidad}
            total,                // Monto total a pagar
            cantidadTotal,        // Cantidad de unidades
            agregarProducto,      // Función para agregar productos
            eliminarProducto,     // Función para eliminar productos
            vaciarCarrito         // Función para vaciar el carrito
        }}>
            {children}
        </CarritoContext.Provider>
    );
};
