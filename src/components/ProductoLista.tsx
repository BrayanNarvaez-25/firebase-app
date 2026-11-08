import {obtenerProductos, eliminarProducto, type Producto} from '../services/productoService'
import { useEffect, useState } from 'react'

interface Props {
  onEditar: (producto: Producto) => void
}

export const ProductoLista = ({onEditar}: Props) => {
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

  const handleEliminar = async (id: string) => {
    try {
      await eliminarProducto(id)
      setProductos(productos.filter((producto) => producto.id !== id))
      console.log(`Producto con ID ${id} eliminado correctamente.`)
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>ID: {producto.id} - {producto.nombre}</strong> - ${producto.precio.toFixed(2)} (Stock: {producto.stock})
            <button onClick={() => onEditar(producto)}>Editar</button>
            <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductoLista