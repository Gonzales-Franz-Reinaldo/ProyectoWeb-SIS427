import '../styles/plataformaDocente.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Tareas = () => {
    // Datos simulados para las tareas (esto normalmente vendría de una API o base de datos)
    const tareas = [
        {
            id_tarea: 1,
            titulo: "Matemática",
            descripcion: "Resolver los ejercicios de la página 100",
            fecha_entrega: "2024-09-15 23:59",
            id_materia: 101,
            id_docente: 201,
            fecha_creacion: "2024-09-01 10:00",
        },
        {
            id_tarea: 2,
            titulo: "Historia",
            descripcion: "Realizar un resumen del capítulo 5",
            fecha_entrega: "2024-09-20 23:59",
            id_materia: 102,
            id_docente: 202,
            fecha_creacion: "2024-09-02 11:00",
        },
        // Agrega más tareas según sea necesario
    ];

    return (
        <div className="tareas-container">
            <header className="tareas-header">
                <h2>Gestión de Tareas</h2>
                <button className="add-tarea-btn">
                    <FontAwesomeIcon icon={faPlus} /> Agregar Nueva Tarea
                </button>
            </header>
            <div className="tareas-table-container">
                <table className="tareas-table">
                    <thead>
                        <tr>
                            <th>ID Tarea</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Fecha de Entrega</th>
                            <th>ID Materia</th>
                            <th>ID Docente</th>
                            <th>Fecha de Creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tareas.map((tarea) => (
                            <tr key={tarea.id_tarea}>
                                <td>{tarea.id_tarea}</td>
                                <td>{tarea.titulo}</td>
                                <td>{tarea.descripcion}</td>
                                <td>{tarea.fecha_entrega}</td>
                                <td>{tarea.id_materia}</td>
                                <td>{tarea.id_docente}</td>
                                <td>{tarea.fecha_creacion}</td>
                                <td className="tarea-actions">
                                    <button className="edit-btn">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="delete-btn">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
