const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO productos (nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion]
        );
        res.json({ id: result.insertId, ...req.body });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

// Editar un producto existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion } = req.body;
    try {
        await db.query(
            'UPDATE productos SET nombre = ?, imagen_url = ?, categoria = ?, marca = ?, modelo = ?, anio_inicio = ?, anio_fin = ?, descripcion = ? WHERE id = ?',
            [nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion, id]
        );
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;
