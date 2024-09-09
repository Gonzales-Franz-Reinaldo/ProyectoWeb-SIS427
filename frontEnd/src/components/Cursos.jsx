

// import '../styles/plataformaDocente.css'; // Importa el archivo CSS

export const Cursos = () => {
    const [cursos, setCursos] = useState([
        { id: 1, nombre: "Curso de Matemáticas", descripcion: "Aprende álgebra y cálculo.", publicado: true },
        { id: 2, nombre: "Curso de Física", descripcion: "Conceptos básicos de física.", publicado: false },
    ]);

    const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', descripcion: '', publicado: false });

    const eliminarCurso = (id) => {
        setCursos(cursos.filter(curso => curso.id !== id));
    };

    const editarCurso = (id) => {
        const curso = cursos.find(curso => curso.id === id);
        const nuevoNombre = prompt("Editar nombre del curso:", curso.nombre);
        const nuevaDescripcion = prompt("Editar descripción del curso:", curso.descripcion);
        setCursos(cursos.map(curso => curso.id === id ? { ...curso, nombre: nuevoNombre, descripcion: nuevaDescripcion } : curso));
    };

    const publicarCurso = (id) => {
        setCursos(cursos.map(curso => curso.id === id ? { ...curso, publicado: true } : curso));
    };

    const agregarCurso = () => {
        setCursos([...cursos, { id: Date.now(), ...nuevoCurso }]);
        setNuevoCurso({ nombre: '', descripcion: '', publicado: false });
    };

    return (
        <div className="container">
            <h1 className="title">Mis Cursos</h1>
            <ul className="course-list">
                {cursos.map(curso => (
                    <li key={curso.id} className="course-card">
                        <h2>{curso.nombre}</h2>
                        <p>{curso.descripcion}</p>
                        <p className={curso.publicado ? "status published" : "status unpublished"}>
                            {curso.publicado ? "Publicado" : "No publicado"}
                        </p>
                        <div className="button-group">
                            <button className="btn edit" onClick={() => editarCurso(curso.id)}>Editar</button>
                            <button className="btn delete" onClick={() => eliminarCurso(curso.id)}>Eliminar</button>
                            {!curso.publicado && <button className="btn publish" onClick={() => publicarCurso(curso.id)}>Publicar</button>}
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="subtitle">Agregar Nuevo Curso</h2>
            <div className="form-group">
                <label>Nombre del curso:</label>
                <input
                    type="text"
                    value={nuevoCurso.nombre}
                    onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Descripción del curso:</label>
                <textarea
                    value={nuevoCurso.descripcion}
                    onChange={(e) => setNuevoCurso({ ...nuevoCurso, descripcion: e.target.value })}
                />
            </div>
            <button className="btn add" onClick={agregarCurso}>Agregar Curso</button>
        </div>
    );
};
