const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_FILE = path.join(__dirname, '..', 'products.json');

// Leer productos desde archivo
async function getStoredProducts() {
  try {
    const rawFileContent = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.products ?? [];
  } catch (error) {
    // Si el archivo no existe o hay error de lectura, devuelve arreglo vacío
    return [];
  }
}

// Guardar productos en archivo
function storeProducts(products) {
  return fs.writeFile(
    DATA_FILE,
    JSON.stringify({ products: products || [] }, null, 2) // con sangría de 2 espacios
  );
}

exports.getStoredProducts = getStoredProducts;
exports.storeProducts = storeProducts;
