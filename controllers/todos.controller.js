const { getStoredTodos, storeTodos } = require('../data/todos');
const md5 = require('blueimp-md5');

// Obtener todos los todos
exports.getAllTodos = async (req, res) => {
  const todos = await getStoredTodos();
  res.status(200).json({ todos });
};

// Obtener un todo por ID
exports.getTodoById = async (req, res) => {
  const todos = await getStoredTodos();
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo no encontrado.' });
  res.json({ todo });
};

// Crear un nuevo todo
exports.createTodo = async (req, res) => {
  const todos = await getStoredTodos();
  const { todo, completed, userId } = req.body;

  if (!todo || typeof completed !== 'boolean' || !userId) {
    return res.status(400).json({ message: 'Datos incompletos o inválidos.' });
  }

  const newTodo = {
    id: md5(todo + Date.now()),
    todo: todo.trim(),
    completed,
    userId
  };

  await storeTodos([newTodo, ...todos]);
  res.status(201).json({ message: 'Nuevo todo almacenado.', todo: newTodo });
};

// Actualizar un todo existente
exports.updateTodo = async (req, res) => {
  const todos = await getStoredTodos();
  const index = todos.findIndex(t => t.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Todo no encontrado.' });

  todos[index] = { ...todos[index], ...req.body };
  await storeTodos(todos);
  res.json(todos[index]);
};

// Eliminar un todo
exports.deleteTodo = async (req, res) => {
  const todos = await getStoredTodos();
  const filtered = todos.filter(t => t.id !== req.params.id);
  await storeTodos(filtered);
  res.status(204).send();
};
