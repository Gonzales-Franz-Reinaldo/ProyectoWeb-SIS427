import axios from 'axios';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);

        axios.post('http://localhost:8081/login', values)
        .then(res => {
            console.log("Respuesta del servidor:", res.data);
            
            if (res.data.state === 'Success') {
                console.log("Rol recibido:", res.data.rol);
                if (res.data.rol === 'Estudiante') {
                    navigate('/plataformaEstudiante');
                } else if (res.data.rol === 'Docente') {
                    navigate('/plataformaDocente');
                }
            } else {
                console.log("Error:", res.data);
                alert("Error: " + res.data.Error);
            }
        })
        .catch(err => {
            console.error("Error de red o de servidor:", err);
            alert("Error de red o de servidor: " + err);
        });
    


    };

    return (
        <div className="login-container">
            <h2>Sign-In</h2>
            <form onSubmit={handleSubmit}>
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

                <button type="submit" className="login-btn">Log in</button>

                <p>Aceptas nuestros términos y políticas.</p>
                <Link to="/register" type="button" className="create-account-btn">Create Account</Link>
            </form>
        </div>
    );
};
