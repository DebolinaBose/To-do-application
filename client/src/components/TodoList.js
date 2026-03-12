import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p className="empty-message">No tasks yet. Start by adding one!</p>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
};

export default TodoList;
