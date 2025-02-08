const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const {
    nombre,
    imagen_url,
    categoria,
    marca,
    modelo,
    anio_inicio,
    anio_fin,
    descripcion,
  } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO productos (nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

// 🛠️ NUEVA RUTA: Actualizar un producto existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    imagen_url,
    categoria,
    marca,
    modelo,
    anio_inicio,
    anio_fin,
    descripcion,
  } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE productos SET nombre = ?, imagen_url = ?, categoria = ?, marca = ?, modelo = ?, anio_inicio = ?, anio_fin = ?, descripcion = ? WHERE id = ?",
      [nombre, imagen_url, categoria, marca, modelo, anio_inicio, anio_fin, descripcion, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({
      id,
      nombre,
      imagen_url,
      categoria,
      marca,
      modelo,
      anio_inicio,
      anio_fin,
      descripcion,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// 🛠️ NUEVA RUTA: Eliminar un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM productos WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

// 🛠️ NUEVA RUTA: Obtener todas las marcas
router.get("/marcas", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM marcas");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener marcas:", error);
    res.status(500).json({ error: "Error al obtener marcas" });
  }
});

// 🛠️ NUEVA RUTA: Obtener todos los modelos con su marca asociada
router.get("/modelos", async (req, res) => {
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
