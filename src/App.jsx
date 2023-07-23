import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer"
import NavBar from "./componentes/NavBar/NavBar";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element ={<ItemListContainer/>}></Route>
      <Route path="/categoria/:idCategoria" element ={<ItemListContainer />}/>
      <Route path="/item/:idItem" element={<ItemDetailContainer />}/>
    </Routes>
    </BrowserRouter> 
    {

    }
</>
  )
}

export default App