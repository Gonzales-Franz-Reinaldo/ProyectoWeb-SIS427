import express, { response } from "express";
import cors from "cors";
import { DateTime } from 'luxon';
import mysql from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd_sis427",
});

// Verificación de la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});



// PARA EL REGISTRO DE LAS PERSONAS 
app.post('/register', (req, res) => {
    const { nombre, apellido, rol, email, password, telefono, especialidad, grado, matricula, CU, carrera } = req.body;

    // const fechaCreacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // const fechaIngreso = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Ajuste de zona horaria
    const timeZone = 'America/La_Paz';
    const fechaCreacion = DateTime.now().setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss');
    const fechaIngreso = DateTime.now().setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss');

    const sqlUsuario = "INSERT INTO usuario (`nombre`, `apellido`, `rol`, `email`, `password`, `fecha_creacion`) VALUES (?)";

    // Asegúrate de definir y configurar correctamente la variable 'salt'
    const saltRounds = 10;
    
    bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const userValues = [nombre, apellido, rol, email, hash, fechaCreacion];

        db.query(sqlUsuario, [userValues], (err, result) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                return res.json({ Error: "Error al registrar el usuario", Details: err });
            }

            const id_usuario = result.insertId;  // Use result.insertId to get the last inserted ID

            if (rol === 'Docente') {

                const sqlDocente = "INSERT INTO docente (`id_usuario`, `especialidad`, `grado`, `telefono`, `fecha_ingreso`) VALUES (?)";
                const docenteValues = [id_usuario, especialidad, grado, telefono, fechaIngreso];

                db.query(sqlDocente, [docenteValues], (err, result) => {
                    if (err) {
                        console.error("Error al insertar en la tabla docente:", err);
                        return res.json({ Error: "Error al registrar el docente", Details: err });
                    }
                    return res.json({ Status: "Success" });
                });

            } else if (rol === 'Estudiante') {

                const sqlEstudiante = "INSERT INTO estudiante (`id_usuario`, `carnet_universitario`, `telefono`, `carrera`, `matricula`, `fecha_ingreso`) VALUES (?)";
                const estudianteValues = [id_usuario, CU, telefono, carrera, matricula, fechaIngreso];

                db.query(sqlEstudiante, [estudianteValues], (err, result) => {
                    if (err) {
                        console.error("Error al insertar en la tabla estudiante:", err);
                        return res.json({ Error: "Error al registrar el estudiante", Details: err });
                    }
                    return res.json({ Status: "Success" });
                });
            }
        });
    });
});




// PARA EL LOGIN DE LAS PERSONAS
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM usuario WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Error al conectar con la base de datos", Details: err });
        if (data.length > 0) {
            // console.log("Datos recibidos:", data[0]);
            
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Error al comparar las contraseñas", Details: err });
                if (response) {
                    return res.json({ state: "Success", rol: data[0].rol, message: "Test" });
                } else {
                    return res.json({ Error: "Contraseña incorrecta" });
                }
            });
        } else {
            return res.json({ Error: "Usuario no encontrado" });
        }
    });
});






app.listen(8081, () => {
    console.log("Connected to backend.");
});
