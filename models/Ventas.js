import mongoose, { mongo } from "mongoose";

const ventasSchema = mongoose.Schema(
  {
    fecha: { type: String, trim: true, requiered: true },
    comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    cantidad: { type: Number, trim: true, requiered: true },
    valor: { type: Number, trim: true, requiered: true },
  },
  { timestamps: true }
);

const Ventas = mongoose.model("Ventas", ventasSchema);
export default Ventas;
