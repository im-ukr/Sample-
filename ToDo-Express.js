const express = require('express');
const app = express();
app.use(express.json());

let todos = []; 
let idCounter = 1; 


const sendResponse = (res, status, success, data, message) => {
    res.status(status).json({ success, data, message });
};


app.post('/api/todos', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return sendResponse(res, 400, false, null, 'Title and description are required.');
    }
    const newTodo = { id: idCounter++, title, description, createdAt: new Date(), updatedAt: new Date() };
    todos.push(newTodo);
    sendResponse(res, 201, true, newTodo, 'Todo created successfully');
});

// Get all todos
app.get('/api/todos', (req, res) => sendResponse(res, 200, true, todos));

// Update a todo
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        return sendResponse(res, 404, false, null, 'Todo not found.');
    }
    if (!title || !description) {
        return sendResponse(res, 400, false, null, 'Title and description are required.');
    }
    Object.assign(todo, { title, description, updatedAt: new Date() });
    sendResponse(res, 200, true, todo, 'Todo updated successfully');
});

// Delete a todo

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index === -1) {
        return sendResponse(res, 404, false, null, 'Todo not found.');
    }
    todos.splice(index, 1);
    sendResponse(res, 200, true, null, 'Todo deleted successfully');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
