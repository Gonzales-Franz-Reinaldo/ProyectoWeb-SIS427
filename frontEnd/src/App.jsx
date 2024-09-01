// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlataformaEstudiante } from "./components/PlataformaEstudiante";
import './styles/App.css';
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { PlataformaDocente } from "./components/PlataformaDocente";


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/plataformaEstudiante" element={<PlataformaEstudiante />} />
        <Route path="/plataformaDocente" element={<PlataformaDocente />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;