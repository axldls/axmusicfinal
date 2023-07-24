const misProductos = [
    { id: 1, nombre: "Guitarras", precio: 500, id: "1", stock:10, img: "../img/guitarra.jpg", idCat: "2"},
    { id: 2, nombre: "pianos", precio: 200, id: "2", stock:10, img: "../img/piano.jpg", idCat: "2"},
    { id: 3, nombre: "Microfonos", precio: 120, id: "3", stock:10, img: "../img/microfono.jpg", idCat: "3"},
    { id: 4, nombre: "Teclados", precio: 900, id: "4",stock:10, img: "../img/teclado.jpg", idCat: "3"},
]

export const getProductos = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(misProductos);
        }, 200);
    });
}

export const getUnProducto = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const producto = misProductos.find(prod => prod.id === id);
            resolve(producto);
        }, 200);
    });
}

export const getProductosPorCategoria = (idCategoria) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const productosCategoria = misProductos.filter(prod => prod.idCat === idCategoria);
            resolve(productosCategoria);
        }, 200);
    });
}
