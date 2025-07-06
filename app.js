const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rutas
app.use('/products', require('./routes/products.routes'));
app.use('/customers', require('./routes/customers.routes'));
app.use('/publications', require('./routes/publications.routes'));
app.use('/todos', require('./routes/todos.routes'));

// Servidor listo
app.listen(8080, () => {
  console.log('🚀 Backend running on port 8080');
});
