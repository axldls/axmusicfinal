const misProductos = [
    { id: 1, nombre: "Guitarras", precio: 500, id: "1", img: "./img/guitarra.jpg", idCat: "2"},
    { id: 2, nombre: "pianos", precio: 200, id: "2", img: "./img/piano.jpg", idCat: "2"},
    { id: 3, nombre: "Microfonos", precio: 120, id: "3", img: "./img/microfono.jpg", idCat: "3"},
    { id: 4, nombre: "Teclados", precio: 900, id: "4", img: "./img/teclado.jpg", idCat: "3"},
]

export const getProductos = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(misProductos);
        }, 2000);
    });
}

export const getUnProducto = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const producto = misProductos.find(prod => prod.id === id);
            resolve(producto);
        }, 2000);
    });
}

export const getProductosPorCategoria = (idCategoria) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const productosCategoria = misProductos.filter(prod => prod.idCat === idCategoria);
            resolve(productosCategoria);
        }, 2000);
    });
}
