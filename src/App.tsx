import './App.css'
import ProductoForm from './components/ProductoForm'
import ProductoLista from './components/ProductoLista'
import { useState } from 'react'
import { obtenerProductosDisponibles, type Producto } from './services/productoService'

function App() {
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null)
  return (
    <div>
      <h1>Registro de productos</h1>
      <ProductoForm key={productoEditar?.id ?? "nuevo"} productoAEditar={productoEditar} />
      <ProductoLista onEditar={setProductoEditar} />
      <div>
        <button onClick={async () => {
          const productosDeConsulta = await obtenerProductosDisponibles()
          console.log('Productos obtenidos con consulta:', productosDeConsulta) 
        }}>
          Consultar productos
        </button>
      </div>
    </div>
  )
}

export default App