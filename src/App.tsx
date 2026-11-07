import { useState } from 'react'
import './App.css'
import {db} from './firebase'
import {collection, addDoc} from 'firebase/firestore'

function App() {

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')

  const guardarProducto = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "productos"), {
        nombre: nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock)
      });
      console.log("Producto agregado con ID: ", docRef.id);

      setNombre('')
      setPrecio('')
      setStock('')
      
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  return (
    <div>
      <h1>Registro de productos</h1>
      <div>
        <form onSubmit={guardarProducto}>
          <input
            type = "text"
            placeholder = "Nombre del producto"
            value = {nombre}
            onChange = {(e) => setNombre(e.target.value)}
          />
          <input
            type = "number"
            placeholder = "Precio del producto"
            value = {precio}
            onChange = {(e) => setPrecio(e.target.value)}
          />
          <input
            type = "number"
            placeholder = "Stock del producto"
            value = {stock}
            onChange = {(e) => setStock(e.target.value)}
          />
          <button type='submit'>Registrar</button>  
        </form>
      </div>
    </div>
  )
}

export default App