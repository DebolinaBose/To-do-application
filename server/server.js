require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Todo App API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
