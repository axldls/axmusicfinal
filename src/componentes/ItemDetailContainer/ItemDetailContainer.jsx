import React, { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/config";

/**
 * Componente ItemDetailContainer
 * 
 * Propósito: Contenedor que obtiene UN producto específico de Firebase
 * Muestra la página de detalle completo del producto seleccionado
 * 
 * Flujo:
 * 1. Obtiene el ID del producto de los parámetros de URL
 * 2. Realiza consulta a Firebase para obtener ese producto
 * 3. Mientras carga, muestra un mensaje "Cargando..."
 * 4. Una vez cargado, muestra el ItemDetail con los datos completos
 * 
 * No recibe props, obtiene datos de:
 * - URL parámetro (router)
 * - Firebase (base de datos)
 */
const ItemDetailContainer = () => {
  // ========== ESTADO LOCAL ==========
  // producto: almacena los datos del producto obtenido de Firebase
  // Se inicializa como objeto vacío {}
  const [producto, setProducto] = useState({});
  
  // loading: indica si aún está cargando el producto
  // Se inicializa en true (porque al montarse, debe cargar datos)
  // Se cambia a false cuando la consulta termina
  const [loading, setLoading] = useState(true);
  
  // ========== PARÁMETRO DE URL ==========
  // idItem: obtiene el ID del producto de la URL usando useParams
  // Ej: si URL es "/Item/abc123", idItem será "abc123"
  // Este ID es el mismo que se usa en Firebase para identificar el documento
  const { idItem } = useParams();

  // ========== EFECTO: TRAER DATOS DE FIREBASE ==========
  // useEffect se ejecuta cuando el componente monta O cuando idItem cambia
  useEffect(() => {
    // ========== CREAR REFERENCIA AL DOCUMENTO ==========
    // doc(db, "inventario", idItem) crea una referencia al documento específico
    // "inventario" es la colección en Firebase
    // idItem es el ID único del documento (producto)
    const nuevoDoc = doc(db, "inventario", idItem);

    // ========== OBTENER DOCUMENTO DE FIREBASE ==========
    // getDoc obtiene el contenido del documento especificado
    getDoc(nuevoDoc)
      .then((res) => {
        // ========== PROCESAR RESPUESTA ==========
        // res.data() obtiene los campos del documento
        const data = res.data();
        
        // Crea un objeto con todos los datos + el ID
        const nuevoProducto = { id: res.id, ...data };
        
        // ========== ACTUALIZAR ESTADO ==========
        // Guarda el producto en el estado
        setProducto(nuevoProducto);
        
        // ========== MARCAR COMO CARGADO ==========
        // Cambiar loading a false para dejar de mostrar "Cargando..."
        setLoading(false);
      })
      .catch((error) => console.log(error));
      
  }, [idItem]); // Dependencia: re-ejecuta si idItem cambia

  // ========== RENDERIZAR CONDICIONAL ==========
  return (
    <>
      {/* Si está cargando, muestra mensaje */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        // Si terminó de cargar, muestra el ItemDetail con los datos
        // {...producto} envía todas las propiedades del producto como props
        // Props: id, nombre, precio, img, stock, idCat
        <ItemDetail {...producto} />
      )}
    </>
  );
};

export default ItemDetailContainer;
