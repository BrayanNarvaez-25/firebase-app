import { db } from '../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export interface Producto {
  id: string
  nombre: string
  precio: number
  stock: number
}

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

export const obtenerProductos = async (): Promise<Producto[]> => {
  const querySnapshot = await getDocs(collection(db, 'productos'))
  
  const productos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Producto[];

  return productos
}