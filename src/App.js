import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./components/Accueil";
import NavBar from './components/NavBar';
import ListProduct from "./components/ListProduct";
import { useState, useEffect }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

  const [products, setProducts] = useState([])

  useEffect(()=> {
    const getProducts = async () => {
      const productsFromServer = await fetchProducts('http://localhost:5000/products')
      setProducts(productsFromServer)
    }
    getProducts()
  }, [])
  
  const fetchProducts = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
/* 
  const insertProduct = (product) => {
    const lastId = products.length > 0 ? products[products.length - 1].id : 0
    const id = lastId + 1
    const newProduct = {id, ...product}
    setProducts([...products, newProduct])
  } */

  const insertProduct = async (product) => {
    const res = await fetch('http://localhost:5000/products',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    const newProduct = await res.json() 
  
    setProducts([...products, newProduct])
  }

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
    setProducts(products.filter((product)=>product.id !==id))
  }

  const updateProduct = async (id, updatedProduct) => {
  
      await fetch(`http://localhost:5000/products/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })

    setProducts(products.map((product) => product.id === id ? { ...product, ...updatedProduct} : product))
  }

  const findProductById = async (id) => {
    const res = await fetch(`http://localhost:5000/products/${id}`,{
    })
    return await res.json() 
  };

  return (
    <BrowserRouter basename="/">
      <div className="vh-100">
        <Header/>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Accueil/>}/>
            <Route path="/products" element={<ListProduct products={products} onInsert={insertProduct} onDelete={deleteProduct} onUpdate={updateProduct} onFindById={findProductById}/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
