import React, { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/config";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);
  const { idItem } = useParams();

  useEffect(() => {
    const nuevoDoc = doc(db, "inventario", idItem);

    getDoc(nuevoDoc)
      .then((res) => {
        const data = res.data();
        const nuevoProducto = { id: res.id, ...data };
        setProducto(nuevoProducto);
        setLoading(false); // Se marca la carga como completa
      })
      .catch((error) => console.log(error));
  }, [idItem]);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ItemDetail {...producto} />
      )}
    </>
  );
};

export default ItemDetailContainer;
