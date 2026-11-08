import './App.css'
import ProductoForm from './components/ProductoForm'
import ProductoLista from './components/ProductoLista'

function App() {
  return (
    <div>
      <h1>Registro de productos</h1>
      <ProductoForm />
      <ProductoLista />
    </div>
  )
}

export default App