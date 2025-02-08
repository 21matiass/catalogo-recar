const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todos los tipos de producto
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM tipo_producto;"
        );
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener los tipos de producto:", error);
        res.status(500).json({ error: "Error al obtener los tipos de producto" });
  }
});

module.exports = router;
