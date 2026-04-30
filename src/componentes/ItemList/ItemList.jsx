import React from "react";
import Item from "../Item/Item";
import "./ItemList.css";

/**
 * Componente ItemList
 * 
 * Propósito: Mostrar una lista/grid de productos
 * Es un componente presentacional que solo renderiza Items
 * 
 * Props recibidas:
 * - productos: array de objetos con {id, nombre, precio, img, idCat, stock}
 *   (Viene de ItemListContainer que las obtiene de Firebase)
 */
const ItemList = ({ productos }) => {
  return (
    // ========== CONTENEDOR DE GRID ==========
    // CSS Grid que organiza los productos en columnas responsivas
    // Ver ItemList.css para ver cómo se distribuyen según el tamaño de pantalla
    <div className="contenedorProductos">
      
      {/* ========== MAPEO DE PRODUCTOS ==========
       * 
       * Map recorre cada producto del array y renderiza un componente Item por cada uno
       * 
       * Props enviadas al Item:
       * {...prod} usa spread para enviar todas las propiedades del producto:
       * - id
       * - nombre
       * - precio
       * - img
       * - stock (no se usa en Item.jsx)
       * - idCat (no se usa en Item.jsx)
       * 
       * key={prod.id} es requerida por React para identificar elementos en listas
       */}
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
};

export default ItemList;
