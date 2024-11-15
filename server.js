const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuracion de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Osli0629',
    database: 'inventario_piezas'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todas las piezas
app.get('/piezas', (req, res) => {
    db.query('SELECT * FROM piezas', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para obtener una pieza por ID
app.get('/piezas/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM piezas WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Ruta para agregar una nueva pieza
app.post('/piezas', (req, res) => {
    const { nombre, descripcion, cantidad, precio } = req.body;
    const query = 'INSERT INTO piezas (nombre, descripcion, cantidad, precio) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, cantidad, precio], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// Ruta para actualizar una pieza
app.put('/piezas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, cantidad, precio } = req.body;
    const query = 'UPDATE piezas SET nombre = ?, descripcion = ?, cantidad = ?, precio = ? WHERE id = ?';
    db.query(query, [nombre, descripcion, cantidad, precio, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Pieza actualizada' });
    });
});

// Ruta para eliminar una pieza
app.delete('/piezas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM piezas WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Pieza eliminada' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});