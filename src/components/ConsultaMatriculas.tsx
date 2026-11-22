
import { useState } from "react";

import {
    obtenerCursosPorEstudiante,
    obtenerEstudiantesPorCurso,
    obtenerMatriculasActivas,
    obtenerMatriculaPorId
} from "../services/matriculaService";

interface Matricula {
    id: string;
    estudianteId: string;
    estudianteNombre: string;
    cursoId: string;
    cursoNombre: string;
    estado: string;
    periodo: string;
}

type TipoConsulta =
    | "estudiante"
    | "curso"
    | "activas"
    | "id";

export default function ConsultaMatriculas() {

    const [tipoConsulta, setTipoConsulta] =
        useState<TipoConsulta>("estudiante");

    const [valor, setValor] = useState("");

    const [matriculas, setMatriculas] =
        useState<Matricula[]>([]);

    const [cargando, setCargando] = useState(false);

    const [error, setError] = useState("");

    const ejecutarConsulta = async () => {

        setCargando(true);
        setError("");
        setMatriculas([]);

        try {
            let resultado: Matricula[] = [];

            switch (tipoConsulta) {
                case "estudiante":
                    resultado = (await obtenerCursosPorEstudiante(valor)) as unknown as Matricula[];
                    break;

                case "curso":
                    resultado = (await obtenerEstudiantesPorCurso(valor)) as unknown as Matricula[];
                    break;

                case "activas":
                    resultado = (await obtenerMatriculasActivas()) as unknown as Matricula[];
                    break;

                case "id": {
                    const matricula = await obtenerMatriculaPorId(valor);
                    resultado = matricula ? [(matricula as unknown as Matricula)] : [];
                    break;
                }
            }

            setMatriculas(resultado);
        } catch (error) {

            console.error(error);
            setError("No se pudo realizar la consulta.");

        } finally {

            setCargando(false);

        }
    };

    const requiereId =
        tipoConsulta !== "activas";

    return (
        <div>

            <h2>Consulta de Matrículas</h2>

            <div>

                <label>Tipo de consulta:</label>

                <select
                    value={tipoConsulta}
                    onChange={(e) => {
                        setTipoConsulta(e.target.value as TipoConsulta);
                        setMatriculas([]);
                        setError("");
                        setValor("");
                    }}
                >
                    <option value="estudiante">
                        Cursos de un estudiante
                    </option>

                    <option value="curso">
                        Estudiantes de un curso
                    </option>

                    <option value="activas">
                        Matrículas activas
                    </option>

                    <option value="id">
                        Matrícula por ID
                    </option>

                </select>

            </div>

            {requiereId && (
                <div>

                    <label>
                        {tipoConsulta === "estudiante"
                            ? "ID del estudiante:"
                            : tipoConsulta === "curso"
                                ? "ID del curso:"
                                : "ID de la matrícula:"}
                    </label>

                    <input
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="Ingrese el ID"
                    />

                </div>
            )}

            <button
                onClick={ejecutarConsulta}
                disabled={cargando || (requiereId && !valor.trim())}
            >
                {cargando ? "Consultando..." : "Consultar"}
            </button>

            {error && (
                <p>{error}</p>
            )}

            <h3>Resultados: {matriculas.length}</h3>

            <table border={1} cellPadding={8}>

                <thead>
                    <tr>
                        <th>ID Matrícula</th>
                        <th>ID Estudiante</th>
                        <th>Estudiante</th>
                        <th>ID Curso</th>
                        <th>Curso</th>
                        <th>Estado</th>
                        <th>Periodo</th>
                    </tr>
                </thead>

                <tbody>

                    {matriculas.length > 0 ? (

                        matriculas.map((matricula) => (

                            <tr key={matricula.id}>

                                <td>{matricula.id}</td>
                                <td>{matricula.estudianteId}</td>
                                <td>{matricula.estudianteNombre}</td>
                                <td>{matricula.cursoId}</td>
                                <td>{matricula.cursoNombre}</td>
                                <td>{matricula.estado}</td>
                                <td>{matricula.periodo}</td>

                            </tr>

                        ))

                    ) : (

                        !cargando && (
                            <tr>
                                <td colSpan={7}>
                                    No hay resultados para mostrar.
                                </td>
                            </tr>
                        )

                    )}

                </tbody>

            </table>

        </div>
    );
}
