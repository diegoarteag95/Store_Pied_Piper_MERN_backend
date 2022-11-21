import mongoose from "mongoose"; //ayuda con la gestion de Mongo DB
import bcrypt from "bcrypt"; //Modulo para encriptar datos en DB

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      requiered: true, //campo obligatorio
      trim: true, //quita espacios inicio - final
    },
    password: {
      type: String,
      requiered: true,
      trim: true,
    },
    email: {
      type: String,
      requiered: true,
      trim: true,
      unique: true, //dato no se puede repetir en base de datos
    },
    rol: {
      type: String,
      default: "cliente",
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // genera dos columnas mas - creado & actualizado
  }
);

//----------Encriptar contraseña----------
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //revisa que la contraseña no se este modificando
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//----------Encriptar contraseña----------

//----------Comprobar contraseña----------
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};
//----------Comprobar contraseña----------

const Usuario = mongoose.model("Usuario", usuarioSchema); //Declar modelo de Usuario
export default Usuario;
