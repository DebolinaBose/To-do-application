import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    // Sync state if props change (e.g. from background refresh or other actions)
    React.useEffect(() => {
        setTitle(todo.title);
        setDescription(todo.description);
    }, [todo.title, todo.description]);

    const handleToggleComplete = () => {
        onUpdate(todo.id, { ...todo, status: !todo.status });
    };

    const handleSave = () => {
        onUpdate(todo.id, { ...todo, title, description });
        setIsEditing(false);
    };

    return (
        <div className={`todo-item ${todo.status ? 'completed' : ''}`}>
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <div className="actions">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="view-mode">
                    <div className="content">
                        <h3 onClick={handleToggleComplete}>{todo.title}</h3>
                        <p>{todo.description}</p>
                    </div>
                    <div className="actions">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
