import { Link, Outlet } from 'react-router-dom';
import '../styles/plataformaDocente.css';

export const PlataformaDocente = () => {
    return (
        <div className="plataforma-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Docente</h2>
                    <p>franz@gmail.com</p>
                    <p>Bienvenido a tu plataforma</p>
                </div>
                <nav className="sidebar-nav">
                    <Link to="tareas" className="nav-link">Gestionar Tareas</Link>
                    <Link to="cursos" className="nav-link">Gestionar Cursos</Link>
                    <Link to="examenes" className="nav-link">Gestionar Exámenes</Link>
                    <Link to="materiales" className="nav-link">Gestionar Materiales</Link>
                    <Link to="historial" className="nav-link">Historial de Actividades</Link>
                    <Link to="calendario" className="nav-link">Calendario</Link>
                    <Link to="mensajes" className="nav-link">Mensajes</Link>
                    <Link to="perfil" className="nav-link">Perfil</Link>
                    <Link to="contactos" className="nav-link">Contactos</Link>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <h1>Panel de Control</h1>
                    <div className="user-info">
                        <p>Ing. Carlitos</p>
                        <button className="logout-btn">Cerrar Sesión</button>
                    </div>
                </header>
                <section className="contenidos">
                    <Outlet /> {/* Aquí se cargarán los componentes anidados */}
                </section>
            </main>
        </div>
    )
}
