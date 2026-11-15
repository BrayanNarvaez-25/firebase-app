import { db } from '../firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'

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

/**
 * Escucha en tiempo real la colección 'productos'.
 * @param onData  callback que recibe la lista actualizada en cada cambio
 * @param onError callback opcional para errores del listener
 * @returns función unsubscribe para cancelar la escucha
 */
export const escucharProductos = (
  onData: (productos: Producto[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  return onSnapshot(
    collection(db, 'productos'),
    (snapshot) => {
      const productos = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Producto[]
      onData(productos)
    },
    (error) => onError?.(error)
  )
}

export const actualizarProducto = async (
  id: string,
  nombre: string,
  precio: number,
  stock: number
) => {
  const docRef = doc(db, 'productos', id)
  await updateDoc(docRef, {
    nombre,
    precio,
    stock,
  })
}

export const eliminarProducto = async (id: string) => {
  const productoRef = doc(db, 'productos', id)
  await deleteDoc(productoRef)
}