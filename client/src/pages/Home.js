import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            const data = response.data;
            
            // Safety check: Activepieces sometimes returns an object like {} or {rows: [..]}
            if (Array.isArray(data)) {
                setTodos(data);
            } else if (data && Array.isArray(data.rows)) {
                setTodos(data.rows); // Handle case where Activepieces returns { rows: [] }
            } else {
                setTodos([]); // Fallback to empty list so map doesn't crash
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching todos:", error);
            setLoading(false);
        }
    };

    const handleAddTodo = async (todo) => {
        try {
            const response = await createTodo(todo);
            const newTodo = Array.isArray(response.data) ? response.data[0] : response.data;
            if (newTodo) {
                setTodos([...todos, newTodo]);
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const handleUpdateTodo = async (id, updatedFields) => {
        try {
            const response = await updateTodo(id, updatedFields);
            const data = response.data;
            let updatedTodo = null;

            if (Array.isArray(data) && data.length > 0) {
                updatedTodo = data[0];
            } else if (data && !Array.isArray(data)) {
                updatedTodo = data;
            }

            if (updatedTodo) {
                setTodos(todos.map(t => (t.id == id ? updatedTodo : t)));
            } else {
                // Backend succeeded but returned no record (common in some Activepieces flows)
                setTodos(todos.map(t => (t.id == id ? { ...t, ...updatedFields } : t)));
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(t => t.id != id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="home-container">
            <header>
                <h1>My Tasks</h1>
                <p>Stay organized and productive</p>
            </header>
            <main>
                <TodoForm onAdd={handleAddTodo} />
                {loading ? (
                    <div className="loader">Loading tasks...</div>
                ) : (
                    <TodoList
                        todos={todos}
                        onUpdate={handleUpdateTodo}
                        onDelete={handleDeleteTodo}
                    />
                )}
            </main>
        </div>
    );
};

export default Home;
