// server.js

const express = require('express');
const app = express();
const db = require('./config/db');
const productRoutes = require('./routes/products');

// Middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
