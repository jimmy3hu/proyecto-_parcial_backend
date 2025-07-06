const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_FILE = path.join(__dirname, '..', 'publications.json');

// Leer todas las publicaciones
async function getStoredPublications() {
  try {
    const rawFileContent = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.publications ?? [];
  } catch (error) {
    // Si el archivo no existe o está vacío
    return [];
  }
}

// Guardar las publicaciones
function storePublications(publications) {
  return fs.writeFile(
    DATA_FILE,
    JSON.stringify({ publications: publications || [] }, null, 2)
  );
}

exports.getStoredPublications = getStoredPublications;
exports.storePublications = storePublications;
