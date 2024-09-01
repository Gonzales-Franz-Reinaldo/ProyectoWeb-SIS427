import { Link } from 'react-router-dom';
import '../styles/Home.css';

export const PlataformaEstudiante = () => {
  
  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-menu">
          <li><Link to="#virtual">Virtual</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#material">Material</Link></li>
          <li><Link to="#trabajos">Trabajos</Link></li>
          <li><Link to="#examenes">Examenes</Link></li>
          <li><Link to="#perfil">Perfil</Link></li>
          <li><Link to="#contacto">Contacto</Link></li>
        </ul>
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <header className="header">
        <h1>Bienvenidos a la plataforma virtual</h1>
      </header>
      <main className="content">
        <section className="tech-section">
          <h2>Tecnologías de Ingeniería</h2>
          <div className="tech-cards">
            <div className="card">
              <img src="https://www.nur.edu/wp-content/uploads/2022/09/ESTUDIASISTEMAS10604.jpg" alt="Tech 1" />
              <h3>Ing. Sistemas</h3>
              <p>Descripción breve.</p>
            </div>
            <div className="card">
              <img src="https://i.ytimg.com/vi/4pqWxJ702s4/maxresdefault.jpg" alt="Tech 2" />
              <h3>Ing. Ciencias de la Computación</h3>
              <p>Descripción breve.</p>
            </div>
            <div className="card">
              <img src="https://uadeo.mx/wp-content/uploads/2020/08/portada-ISIyR-768x512.jpg" alt="Tech 3" />
              <h3>Ing. Información y Seguridad</h3>
              <p>Descripción breve.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
