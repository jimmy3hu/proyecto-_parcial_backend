const { getStoredProducts, storeProducts } = require('../data/products');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  const products = await getStoredProducts();
  res.status(200).json({ products });
};

// Obtener por nombre
exports.getProductByName = async (req, res) => {
  const clave = req.params.nombre.trim().toLowerCase();
  const products = await getStoredProducts();
  const product = products.find(p => p.nombre.trim().toLowerCase() === clave);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json({ product });
};

// Crear nuevo producto
exports.createProduct = async (req, res) => {
  const existing = await getStoredProducts();
  const { nombre, categoria, stock, precioUnitario, proveedor, fechaIngreso } = req.body;
  const clave = nombre.trim().toLowerCase();

  if (existing.some(p => p.nombre.trim().toLowerCase() === clave)) {
    return res.status(400).json({ message: 'Ya existe un producto con ese nombre.' });
  }

  const newProduct = {
    nombre: clave,
    categoria,
    stock,
    precioUnitario,
    proveedor,
    fechaIngreso
  };

  await storeProducts([newProduct, ...existing]);
  res.status(201).json({ message: 'Producto almacenado.', product: newProduct });
};

// Actualizar producto por nombre
exports.updateProduct = async (req, res) => {
  const clave = req.params.nombre.trim().toLowerCase();
  const products = await getStoredProducts();
  const index = products.findIndex(p => p.nombre.trim().toLowerCase() === clave);

  if (index === -1) return res.status(404).send('Producto no encontrado');

  products[index] = { ...products[index], ...req.body };
  await storeProducts(products);
  res.json(products[index]);
};

// Eliminar producto por nombre
exports.deleteProduct = async (req, res) => {
  const clave = req.params.nombre.trim().toLowerCase();
  const products = await getStoredProducts();
  const filtered = products.filter(p => p.nombre.trim().toLowerCase() !== clave);
  await storeProducts(filtered);
  res.status(204).send();
};
