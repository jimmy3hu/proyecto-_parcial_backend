const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_FILE = path.join(__dirname, '..', 'todos.json');

// Leer todas las tareas desde archivo
async function getStoredTodos() {
  try {
    const rawFileContent = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.todos ?? [];
  } catch (error) {
    // Si el archivo aún no existe, devuelve una lista vacía
    return [];
  }
}

// Guardar lista de tareas en archivo
function storeTodos(todos) {
  return fs.writeFile(
    DATA_FILE,
    JSON.stringify({ todos: todos || [] }, null, 2) // Con indentación de 2 espacios
  );
}

exports.getStoredTodos = getStoredTodos;
exports.storeTodos = storeTodos;
