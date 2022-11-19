import express from "express";
import {
  nuevaVenta,
  obtenerVentas,
  obtenerVenta,
  editarVenta,
  eliminarVenta,
} from "../controllers/venta.controller.js";
import checkAuth from "../middleware/checkAuth.js";

const ventaRouter = express.Router();

ventaRouter
  .route("/")
  .get(checkAuth, obtenerVentas)
  .post(checkAuth, nuevaVenta);

ventaRouter
  .route("/:id")
  .get(checkAuth, obtenerVenta)
  .put(checkAuth, editarVenta)
  .delete(checkAuth, eliminarVenta);

export default ventaRouter;
