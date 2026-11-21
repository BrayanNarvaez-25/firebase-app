import { useState } from 'react'
import type {
    DocumentData,
    QueryDocumentSnapshot,
} from 'firebase/firestore'
import { obtenerProductosPaginados, type Producto } from '../services/productoService'

export const ProductoListaPaginada = () => {
    const [productos, setProductos] = useState<Producto[]>([])
    const [ultimosDocumentos, setUltimosDocumentos] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)

    const cargarPrimeraPagina = async () => {
        const resultado = await obtenerProductosPaginados()
        setProductos(resultado.productos);
        setUltimosDocumentos(resultado.ultimoDocumento);
    }

    const siguientePagina = async () => {
        if (ultimosDocumentos) {
            const resultado = await obtenerProductosPaginados(ultimosDocumentos)
            setProductos(resultado.productos);
            setUltimosDocumentos(resultado.ultimoDocumento);
        }
    }

    return (
        <div>
            <h2>Lista de Productos Paginada</h2>
            <button onClick={cargarPrimeraPagina}>Cargar Productos</button>
            {productos.map((producto) => (
                <div>
                    <div key={producto.id}>
                        <p>
                            {producto.nombre}
                            {producto.precio.toFixed(2)}
                            {producto.stock}
                        </p>
                    </div>
                </div>
            ))}
            <div>
                <button onClick={siguientePagina} disabled={!ultimosDocumentos}>
                    Siguiente Página
                </button>
            </div>
        </div>
    )
}