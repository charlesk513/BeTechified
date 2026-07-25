const express = require('express');

const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// GET active todos (todos that are not completed)
// This route must come before /todos/:id.
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter((todo) => todo.completed === false);
  res.status(200).json(activeTodos);
});

// GET completed todos
app.get('/todos/completed', (req, res) => {
  const completedTodos = todos.filter((todo) => todo.completed === true);
  res.status(200).json(completedTodos);
});

// GET one todo by ID
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Todo ID must be a number' });
  }

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(200).json(todo);
});

// CREATE a new todo
app.post('/todos', (req, res) => {
  const { task, completed = false } = req.body;

  // Validation: the task field is required.
  if (typeof task !== 'string' || task.trim() === '') {
    return res.status(400).json({ error: 'Task field is required' });
  }

  const nextId = todos.length > 0
    ? Math.max(...todos.map((todo) => todo.id)) + 1
    : 1;

  const newTodo = {
    id: nextId,
    task: task.trim(),
    completed: Boolean(completed),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE part of a todo
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if ('task' in req.body) {
    if (typeof req.body.task !== 'string' || req.body.task.trim() === '') {
      return res.status(400).json({ error: 'Task cannot be empty' });
    }
    todo.task = req.body.task.trim();
  }

  if ('completed' in req.body) {
    todo.completed = Boolean(req.body.completed);
  }

  res.status(200).json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todoIndex = todos.findIndex((item) => item.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error!' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
