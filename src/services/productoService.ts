import { db } from '../firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  type Unsubscribe,
  QueryDocumentSnapshot,
  startAfter,
  type DocumentData,
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

export const obtenerProductosDisponibles = async (
) => {

  const consulta = query(
    collection(db, 'productos'),
    where('categoria', '==', 'tecnologia'),
    where('stock', '>', 0),
    where('precio', '>=', 100),
    where('precio', '<=', 500),
    limit(2),
    orderBy('precio')
  )

  const querySnapshot = await getDocs(consulta)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Producto[]
}

export const obtenerProductosPaginados = async ( ultimosDocumentos ?: QueryDocumentSnapshot<DocumentData>) => {
  let consulta;

  if (ultimosDocumentos) {
    consulta = query(
      collection(db, 'productos'),
      orderBy('precio', 'asc'),
      startAfter(ultimosDocumentos),
      limit(5)
    )
  } else {
    consulta = query(
      collection(db, 'productos'),
      orderBy('precio', 'asc'),
      limit(5)
    )
  }

  const snapshot = await getDocs(consulta);

  const productos = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Producto[];

  const nuevoUltimoDocumento = snapshot.docs[snapshot.docs.length - 1];

  return {
    productos,
    ultimoDocumento: nuevoUltimoDocumento,
  };
}