const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_FILE = path.join(__dirname, '..', 'customers.json');

async function getStoredCustomers() {
  try {
    const rawFileContent = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.customers ?? [];
  } catch (error) {
    // Si el archivo no existe o hay error de parseo, retorna lista vacía
    return [];
  }
}

function storeCustomers(customers) {
  return fs.writeFile(
    DATA_FILE,
    JSON.stringify({ customers: customers || [] }, null, 2) // <-- indentación bonita
  );
}

exports.getStoredCustomers = getStoredCustomers;
exports.storeCustomers = storeCustomers;
