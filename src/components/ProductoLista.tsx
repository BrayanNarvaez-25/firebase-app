import {
  escucharProductos,
  eliminarProducto,
  type Producto,
} from '../services/productoService'
import { useEffect, useState } from 'react'

interface Props {
  onEditar: (producto: Producto) => void
}

export const ProductoLista = ({ onEditar }: Props) => {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    // Suscripción en tiempo real: se ejecuta al montar y en cada cambio de Firestore
    const unsubscribe = escucharProductos(
      (datos) => setProductos(datos),
      (error) => console.error('Error al escuchar productos:', error)
    )

    // Cleanup: cierra el listener al desmontar el componente
    return () => unsubscribe()
  }, [])

  const handleEliminar = async (id: string) => {
    try {
      await eliminarProducto(id)
      // onSnapshot actualiza la lista automáticamente
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