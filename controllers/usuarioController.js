import Usuario from "../models/Usuario.js"; //importar modelo
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";

const registrar = async (req, res) => {
  //----------Verificar SI El Email Ya Existe en DB----------
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error(`El correo: ${email} ya se encuentra registrado`);
    return res.status(400).json({ msg: error.message });
  }
  //----------Verificar SI El Email Ya Existe en DB----------

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId(); //agrega token id a usuario
    await usuario.save();

    //----------Enviar Correo Con Token----------
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    //----------Enviar Correo Con Token----------

    res.json({
      msg: "Usuario creado correctamente, revisa tu correo para confirmar la cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //----------Comprobar Que El Usuario Exista----------
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error(`El correo: ${email} NO esta registrado`);
    return res.status(404).json({ msg: error.message });
  }
  //----------Comprobar Que El Usuario Exista----------

  //----------Comprobar Que El Usuario Este Confirmado----------
  if (!usuario.confirmado) {
    const error = new Error(`El correo: ${email} NO esta confirmado`);
    return res.status(403).json({ msg: error.message });
  }
  //----------Comprobar Que El Usuario Este Confirmado----------

  //----------Comprobar Contraseña----------
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error(`La contraseña es incorrecta`);
    return res.status(403).json({ msg: error.message });
  }
  //----------Comprobar Contraseña----------
};

const confirmar = async (req, res) => {
  //----------Comprobar Que El Token Exista----------
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error(`Token no valido`);
    return res.status(404).json({ msg: error.message });
  }
  //----------Comprobar Que El Token Exista----------
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  //----------Verificar SI El Email Ya Existe en DB----------
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error(`Correo NO registrado`);
    return res.status(404).json({ msg: error.message });
  }
  //----------Verificar SI El Email Ya Existe en DB----------
  try {
    usuario.token = generarId();
    await usuario.save();

    //----------Enviar Correo----------
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    //----------Enviar Correo----------

    res.json({ msg: "Hemos enviado un correo con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  //----------Comprobar Que El Token Exista----------
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error(`Token no valido`);
    return res.status(404).json({ msg: error.message });
  }
  //----------Comprobar Que El Token Exista----------
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  //----------Comprobar Que El Token Exista----------
  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Contraseña cambiada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error(`Token no valido`);
    return res.status(404).json({ msg: error.message });
  }
  //----------Comprobar Que El Token Exista----------
};

const perfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
