import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer"
import NavBar from "./componentes/NavBar/NavBar";
import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from "./componentes/Context/CarritoContext";
import "./App.css";
import Cart from "./componentes/Cart/Cart";
import Checkout from "./componentes/Checkout/Checkout";

const App = () => {
  return (
    <>
      <CarritoProvider>
        <NavBar />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/categoria/:idCategoria" element={<ItemListContainer />} />
          <Route path="/item/:idItem" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CarritoProvider>
    </>
  )
}

export default App
