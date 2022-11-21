import Ventas from "../models/Ventas.js";

const nuevaVenta = async (req, res) => {
  const venta = new Ventas(req.body);
  venta.cliente = req.usuario._id;
  try {
    const ventaAlmacenada = await venta.save();
    res.json(ventaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerVentas = async (req, res) => {
  const ventas = await Ventas.find();
  res.json(ventas);
};

const obtenerVenta = async (req, res) => {
  const { id } = req.params;
  const venta = await Ventas.findById(id);
  if (!venta) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(venta);
};

const editarVenta = async (req, res) => {
  const { id } = req.params;
  const venta = await Ventas.findById(id);
  if (!venta) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  venta.fecha = req.body.fecha || venta.fecha;
  venta.cantidad = req.body.cantidad || venta.cantidad;
  venta.valor = req.body.valor || venta.valor;

  try {
    const ventaAlmacenada = await venta.save();
    res.json(ventaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarVenta = async (req, res) => {
  const { id } = req.params;
  const venta = await Ventas.findById(id);
  if (!venta) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  try {
    await venta.deleteOne();
    res.json({ msg: "Venta Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { nuevaVenta, obtenerVentas, obtenerVenta, editarVenta, eliminarVenta };
