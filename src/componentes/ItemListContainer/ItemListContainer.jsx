import React, { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/config";

/**
 * Componente ItemListContainer
 * 
 * Propósito: Contenedor inteligente que trae productos de Firebase y los muestra
 * Se encarga de toda la lógica: obtener datos, filtrar por categoría, manejar carga
 * 
 * Flujo:
 * 1. Obtiene parámetro de URL (categoría) si existe
 * 2. Realiza consulta a Firebase según la categoría
 * 3. Guarda los productos en estado
 * 4. Los pasa a ItemList para mostrarlos
 * 
 * No recibe props directamente, obtiene datos de:
 * - URL parámetro (router)
 * - Firebase (base de datos)
 */
const ItemListContainer = () => {
  // ========== ESTADO LOCAL ==========
  // productos: array que almacena los productos traídos de Firebase
  // Se inicializa vacío y se llena cuando la consulta completa
  const [productos, setProductos] = useState([]);
  
  // ========== PARÁMETRO DE URL ==========
  // idCategoria: obtiene el parámetro de la URL usando useParams de React Router
  // Ej: si la URL es "/categoria/2", idCategoria será "2"
  // Si la URL es "/", idCategoria será undefined
  const { idCategoria } = useParams();

  // ========== EFECTO: TRAER DATOS DE FIREBASE ==========
  // useEffect se ejecuta cuando el componente monta O cuando idCategoria cambia
  useEffect(() => {
    // ========== CONSTRUIR CONSULTA SEGÚN CATEGORÍA ==========
    // Si idCategoria existe, filtra por esa categoría
    // Si NO existe, trae TODOS los productos
    const misProductos = idCategoria
      ? query(collection(db, "inventario"), where("idCat", "==", idCategoria))
      : collection(db, "inventario");

    // ========== EJECUTAR CONSULTA A FIREBASE ==========
    // getDocs obtiene todos los documentos que coinciden con la consulta
    getDocs(misProductos)
      .then((res) => {
        // ========== PROCESAR RESPUESTA ==========
        // res.docs es un array de documentos de Firebase
        // Map convierte cada documento en un objeto con sus datos
        const nuevosProductos = res.docs.map((doc) => {
          // doc.data() obtiene los campos del documento
          const data = doc.data();
          // doc.id es el ID único del documento en Firebase
          return { id: doc.id, ...data };
        });
        
        // ========== GUARDAR PRODUCTOS EN ESTADO ==========
        // Actualiza el estado con los productos obtenidos
        // ItemList se re-renderizará automáticamente con estos datos
        setProductos(nuevosProductos);
      })
      .catch((error) => console.log(error));
      
  }, [idCategoria]); // Dependencia: re-ejecuta si idCategoria cambia

  // ========== RENDERIZAR ==========
  return (
    <>
      {/* Título de la sección */}
      <h2 style={{ textAlign: "center" }}> Mis Productos </h2>
      
      {/* Pasa los productos a ItemList para que los muestre */}
      {/* ItemList recibe el array y lo mapea en tarjetas individuales */}
      <ItemList productos={productos} />
    </>
  );
};

export default ItemListContainer;
