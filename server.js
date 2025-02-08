require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products");
const commentRoutes = require("./routes/comments");
const marcasRoutes = require("./routes/marcas");
const modelosRoutes = require("./routes/modelos");
const tipoProductoRoutes = require("./routes/tipoProducto");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/marcas", marcasRoutes);
app.use("/api/modelos", modelosRoutes);
app.use("/api/tipo-producto", tipoProductoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
