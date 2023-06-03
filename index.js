// server.js

const express = require('express');
const app = express();
const db = require('./config/db');
const eventRoute = require('./routes/eventRoute');

// Middleware
app.use(express.json());


// Routes
app.use('/', eventRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
