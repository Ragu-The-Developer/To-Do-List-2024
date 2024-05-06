import React from 'react';
import TodoItem from '../components/ToDoItem';

const TodoList = ({ todos, onComplete, onDelete, onImportant }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          task={todo}
          onComplete={onComplete}
          onDelete={onDelete}
          onImportant={onImportant}
        />
      ))}
    </div>
  );
};

export default TodoList;
