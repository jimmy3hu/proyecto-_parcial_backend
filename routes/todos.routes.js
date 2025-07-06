const express = require('express');
const router = express.Router();
const controller = require('../controllers/todos.controller');

router.get('/', controller.getAllTodos);
router.get('/:id', controller.getTodoById);
router.post('/', controller.createTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;

const { getStoredTodos, storeTodos } = require('../data/todos');
const md5 = require('blueimp-md5');

exports.getAllTodos = async (req, res) => {
  const todos = await getStoredTodos();
  res.status(200).json({ todos });
};

exports.getTodoById = async (req, res) => {
  const todos = await getStoredTodos();
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).send('Todo not found.');
  res.json({ todo });
};

exports.createTodo = async (req, res) => {
  const todos = await getStoredTodos();
  const { todo, completed, userId } = req.body;

  const newTodo = {
    id: md5(todo + Date.now()),
    todo,
    completed,
    userId
  };

  await storeTodos([newTodo, ...todos]);
  res.status(201).json({ message: 'Stored new todo.', todo: newTodo });
};

exports.updateTodo = async (req, res) => {
  const todos = await getStoredTodos();
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).send('Todo not found.');

  todos[index] = { ...todos[index], ...req.body };
  await storeTodos(todos);
  res.json(todos[index]);
};

exports.deleteTodo = async (req, res) => {
  const todos = await getStoredTodos();
  const filtered = todos.filter(t => t.id !== req.params.id);
  await storeTodos(filtered);
  res.status(204).send();
};
