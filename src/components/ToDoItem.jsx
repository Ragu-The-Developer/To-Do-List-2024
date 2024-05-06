import React from 'react';

const TodoItem = ({ task, onComplete, onDelete, onImportant }) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleImportant = () => {
    onImportant(task.id);
  };

  return (
    <div
      className={`todo-item ${task.completed ? 'completed' : ''} ${
        task.priority
      }`}
    >
      <span className="task">{task.text}</span>
      <div className="actions">
        <button onClick={handleComplete}>Complete</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleImportant} className={`${task.important ? 'important' : ''}`}>
          Mark Important
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
