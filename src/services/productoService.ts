import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

export async function crearProducto(
  nombre: string,
  precio: number,
  stock: number
) {
  const docRef = await addDoc(collection(db, 'productos'), {
    nombre,
    precio,
    stock,
  })
  return docRef.id
}