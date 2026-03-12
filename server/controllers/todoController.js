const db = require('../models/db');

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await db('todos').select('*').orderBy('id', 'asc');
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const [newTodo] = await db('todos')
            .insert({ title, description })
            .returning('*');
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        await db('todos').where({ id }).update({ title, description, status });
        const updatedTodo = await db('todos').where({ id }).first();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await db('todos').where({ id }).del();
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
