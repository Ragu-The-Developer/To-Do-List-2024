import React, { useState, useEffect } from 'react';
import './App.css';
import { jsPDF } from 'jspdf';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskLevel, setTaskLevel] = useState('low');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskLevelChange = (event) => {
    setTaskLevel(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { text: newTask, level: taskLevel };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('TODO List', 10, 10);
    let yPos = 20;
    tasks.forEach((task, index) => {
      const taskString = `${index + 1}. ${task.text} (${task.level}) ${
        task.completed ? '[Completed]' : ''
      }`;
      doc.text(taskString, 10, yPos);
      yPos += 10;
    });
    doc.save('todo_list.pdf');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>TO-DO List</h1>
        <div className="add-task">
          <input
            type="text" 
            placeholder="Enter Tasks"
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <select value={taskLevel} onChange={handleTaskLevelChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="tasks">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`task ${task.level} ${task.completed ? 'completed' : ''}`}
            >
              <span>{task.text}</span>
              <div className="actions">
                <button onClick={() => handleCompleteTask(index)} className='mark'>Mark</button>
                <button onClick={() => handleDeleteTask(index)} className='delete'>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {tasks.length > 0 && (
          <button className="export-button" onClick={handleExportPDF}>
            Export as PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
