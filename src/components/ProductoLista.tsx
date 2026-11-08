import {obtenerProductos, type Producto} from '../services/productoService'
import { useEffect, useState } from 'react'

export const ProductoLista = () => {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos()
        setProductos(datos)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }

    cargarProductos()
  }, [])

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>{producto.id} - {producto.nombre}</strong> - ${producto.precio.toFixed(2)} (Stock: {producto.stock})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductoLista