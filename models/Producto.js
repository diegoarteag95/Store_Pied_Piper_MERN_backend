import mongoose, { mongo } from "mongoose";

const productosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      requiered: true,
    },
    descripcion: {
      type: String,
      trim: true,
      requiered: true,
    },
    precio: {
      type: Number,
      trim: true,
      requiered: true,
    },
    stock: {
      type: Number,
      trim: true,
      requiered: true,
    },
    img: {
      type: String,
      trim: true,
      requiered: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productosSchema);
export default Producto;
