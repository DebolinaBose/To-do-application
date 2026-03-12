import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, description, priority: parseInt(priority) });
        setTitle('');
        setDescription('');
        setPriority(1);
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <h2>Add New Task</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Priority: </label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
            </div>
            <button type="submit" className="add-btn">Add Task</button>
        </form>
    );
};

export default TodoForm;
