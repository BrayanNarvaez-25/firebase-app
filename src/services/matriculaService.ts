
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    type DocumentSnapshot
} from "firebase/firestore";

import { db } from "../firebase";

// Referencia a la colección
const matriculasRef = collection(db, "matriculas");

// Función auxiliar para normalizar los campos en caso de discrepancias de nombres
const normalizarMatricula = (documento: DocumentSnapshot) => {
    const data = documento.data() || {};
    return {
        id: documento.id,
        ...data,
        estudianteId: data.estudianteId || data.estdiantesId || "",
        cursoId: data.cursoId || data.cursosId || "",
    };
};

// 1. Obtener los cursos de un estudiante
export const obtenerCursosPorEstudiante = async (
    estudianteId: string
) => {
    try {
        const consulta = query(
            matriculasRef,
            where("estudianteId", "==", estudianteId)
        );

        const resultado = await getDocs(consulta);

        return resultado.docs.map(normalizarMatricula);

    } catch (error) {
        console.error("Error al consultar cursos:", error);
        throw error;
    }
};

// 2. Obtener los estudiantes de un curso
export const obtenerEstudiantesPorCurso = async (
    cursoId: string
) => {
    try {
        const consulta = query(
            matriculasRef,
            where("cursoId", "==", cursoId)
        );

        const resultado = await getDocs(consulta);

        return resultado.docs.map(normalizarMatricula);

    } catch (error) {
        console.error("Error al consultar estudiantes:", error);
        throw error;
    }
};

// 3. Obtener todas las matrículas activas
export const obtenerMatriculasActivas = async () => {
    try {
        const consulta = query(
            matriculasRef,
            where("estado", "==", "ACTIVA")
        );

        const resultado = await getDocs(consulta);

        return resultado.docs.map(normalizarMatricula);

    } catch (error) {
        console.error("Error al consultar matrículas activas:", error);
        throw error;
    }
};

// 4. Obtener una matrícula por su ID
export const obtenerMatriculaPorId = async (
    matriculaId: string
) => {
    try {
        const referencia = doc(db, "matriculas", matriculaId);

        const resultado = await getDoc(referencia);

        if (!resultado.exists()) {
            return null;
        }

        return normalizarMatricula(resultado);

    } catch (error) {
        console.error("Error al consultar matrícula:", error);
        throw error;
    }
};
