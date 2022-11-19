import express from "express";
import {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
  editarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";
import checkAuth from "../middleware/checkAuth.js";

const productoRouter = express.Router();

productoRouter
  .route("/")
  .get(checkAuth, obtenerProductos)
  .post(checkAuth, nuevoProducto);

productoRouter
  .route("/:id")
  .get(checkAuth, obtenerProducto)
  .put(checkAuth, editarProducto)
  .delete(checkAuth, eliminarProducto);

export default productoRouter;
