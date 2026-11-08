import { useState } from 'react'
import { actualizarProducto, crearProducto, type Producto } from '../services/productoService'

interface Props {
  productoAEditar: Producto | null
}

function ProductoForm({ productoAEditar }: Props) {
  const [nombre, setNombre] = useState(productoAEditar ? productoAEditar.nombre : '')
  const [precio, setPrecio] = useState(productoAEditar ? productoAEditar.precio.toString() : '')
  const [stock, setStock] = useState(productoAEditar ? productoAEditar.stock.toString() : '')

  const guardarProducto = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    try {
      if (productoAEditar) {
        await actualizarProducto(productoAEditar.id, nombre, parseFloat(precio), parseInt(stock))
        console.log("Producto actualizado con ID: ", productoAEditar.id)
      } else {
        const id = await crearProducto(nombre, parseFloat(precio), parseInt(stock))
        console.log("Producto agregado con ID: ", id)
      }

      setNombre('')
      setPrecio('')
      setStock('')
    } catch (e) {
      console.error("Error: ", e)
    }
  }

  return (
    <form onSubmit={guardarProducto}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio del producto"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock del producto"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit">{productoAEditar ? "Actualizar" : "Registrar"}</button>
    </form>
  )
}

export default ProductoForm