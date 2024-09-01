import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlataformaEstudiante } from "./components/PlataformaEstudiante";
import './styles/App.css';
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { PlataformaDocente } from "./components/PlataformaDocente";
import { Tareas } from "./components/Tareas";  // Asegúrate de importar este componente
import { Cursos } from "./components/Cursos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/plataformaEstudiante" element={<PlataformaEstudiante />} />
        <Route path="/plataformaDocente" element={<PlataformaDocente />}>
          {/* Anidamos las rutas de PlataformaDocente */}
          <Route path="tareas" element={<Tareas />} />
          <Route path="cursos" element={<Cursos />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
