import express, { response } from "express";
import cors from "cors";
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

    const sql = "INSERT INTO persona (`nombre`, `apellido`, `rol`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const values = [
            req.body.nombre,
            req.body.apellido,
            req.body.rol,
            req.body.email,
            hash
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                return res.json({ Error: "Error al registrar el usuario", Details: err });
            }
            return res.json({ Status: "Success" });
        });
    });
})


// PARA EL LOGIN DE LAS PERSONAS
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM persona WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Error al conectar con la base de datos", Details: err });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Error al comparar las contraseñas", Details: err });
                if (response) {
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Contraseña incorrecta" });
                }
            })
        } else {
            return res.json({ Error: "Usuario no encontrado" });
        }
    })
});




app.listen(8081, () => {
    console.log("Connected to backend.");
});
