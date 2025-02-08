const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM comentarios');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
});

// Eliminar un comentario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM comentarios WHERE id = ?', [id]);
        res.json({ message: 'Comentario eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
});

module.exports = router;
