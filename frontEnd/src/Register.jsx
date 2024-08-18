// import React from 'react';
import { useState } from 'react';
import './styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Register = () => {

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        rol: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);

        axios.post('http://localhost:8081/register', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    console.log("Error:", res.data);
                    alert("Error: " + res.data.Error);
                }
            })
            .catch(err => {
                console.error("Error de red o de servidor:", err);
                alert("Error de red o de servidor: " + err);
            });

    }

    return (
        <div className="register-container">
            <h2>Sign-Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Introduzca nombre" required
                        onChange={e => setValues({ ...values, nombre: e.target.value })} />
                </div>
                <div className="input-box">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Entruduzca apellido" required
                        onChange={e => setValues({ ...values, apellido: e.target.value })} />
                </div>
                <div className="input-box">
                    <label>Rol:</label>
                    <select name="" id="" onChange={e => setValues({ ...values, rol: e.target.value })}>
                        <option value="Admin">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                </div>

                <div className="input-box">
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" required
                        onChange={e => setValues({ ...values, email: e.target.value })} />
                </div>
                <div className="input-box">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" required
                        onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
                <button type="submit" className="signup-btn">Sign up</button>
                <p>Estás de acuerdo con nuestros términos y políticas.</p>
                <Link to="/login" type="button" className="login-btn">Login</Link>
            </form>
        </div>
    );
};
