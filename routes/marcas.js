const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todas las marcas
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM marcas");
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener marcas:", error);
        res.status(500).json({ error: "Error al obtener marcas" });
    }
});

module.exports = router;
