import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js"; // verifica si un usuario se encuentra autenticado

const usuarioRouter = express.Router();

//----------Autenticacion, Registro Y Confirmacion De Usuarios----------
usuarioRouter.post("/", registrar);
usuarioRouter.post("/login", autenticar);
usuarioRouter.get("/confirmar/:token", confirmar);
usuarioRouter.post("/olvide-password", olvidePassword);
usuarioRouter
  .route("/olvide-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);

usuarioRouter.get("/perfil", checkAuth, perfil);
//----------Autenticacion, Registro Y Confirmacion De Usuarios----------

export default usuarioRouter;
