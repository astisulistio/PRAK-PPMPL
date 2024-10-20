// src/app.js
const express = require('express');
const app = express();
const port = 3000;

const controller = require('./controller');

app.use(express.json());

// Routes
app.get('/api/items', controller.getItems);
app.get('/api/items/:id', controller.getItemsById);
app.post('/api/items', controller.createItem);
app.put('/api/items/:id', controller.updateItem);  // Update route
app.delete('/api/items/:id', controller.deleteItem);  // Delete route

// Start the server
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});

module.exports = app;
