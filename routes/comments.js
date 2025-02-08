const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todos los comentarios
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM comentarios");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener los comentarios:", err);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

// Agregar un nuevo comentario
router.post("/", async (req, res) => {
  const { usuario, comentario } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO comentarios (usuario, comentario) VALUES (?, ?)",
      [usuario, comentario]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("❌ Error al agregar el comentario:", err);
    res.status(500).json({ error: "Error al agregar el comentario" });
  }
});

module.exports = router;
