import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer"
import NavBar from "./componentes/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from "./componentes/Context/CarritoContext";
import "./App.css";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />}></Route>
            <Route path="/categoria/:idCategoria" element={<ItemListContainer />} />
            <Route path="/item/:idItem" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<h2> Dentro de poco tus productos estarán aquí! </h2>} />
          </Routes>
        </CarritoProvider>
      </BrowserRouter>



      {

      }
    </>
  )
}

export default App