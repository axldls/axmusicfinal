import React, { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getUnProducto } from "../../../asynmock";


const ItemDetailContainer = () => {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);

  const { idItem } = useParams();

  useEffect(() => {
    getUnProducto(idItem)
      .then((res) => {
        setProducto(res);
        setLoading(false);
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
