import Producto from "../models/Producto.js";

const nuevoProducto = async (req, res) => {
  const producto = new Producto(req.body);
  // producto.creador = req.usuario._id;
  try {
    const productoAlmacenado = await producto.save();
    res.json(productoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProductos = async (req, res) => {
  const productos = await Producto.find();
  //.where("creador").equals(req.usuario); esto traera solo lo de el usuario creador
  res.json(productos);
};

const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  if (!producto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(producto);
};

const editarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  if (!producto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  producto.nombre = req.body.nombre || producto.nombre;
  producto.descripcion = req.body.descripcion || producto.descripcion;
  producto.precio = req.body.precio || producto.precio;
  producto.stock = req.body.stock || producto.stock;
  producto.img = req.body.img || producto.img;

  try {
    const productoAlmacenado = await producto.save();
    res.json(productoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  if (!producto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  try {
    await producto.deleteOne();
    res.json({ msg: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
  editarProducto,
  eliminarProducto,
};
