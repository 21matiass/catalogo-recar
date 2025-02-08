const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todos los modelos con su marca asociada
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT modelos.id, modelos.nombre, modelos.marca_id, marcas.nombre AS marca FROM modelos JOIN marcas ON modelos.marca_id = marcas.id"
        );
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener modelos:", error);
        res.status(500).json({ error: "Error al obtener modelos" });
    }
});

module.exports = router;
