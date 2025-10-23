import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      dueDate,
      priority,
    };

    setTasks(prev => [...prev, newTask]);
    setInputValue('');
    setDueDate('');
    setPriority('medium');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <div className="App">
      <h1 className="app-title">🌸 Task Tracker</h1>

      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
        />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="add-btn" onClick={handleAddTask}>+ Add</button>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TaskFilter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={tasks}          // pass full array
        setTasks={setTasks}    // required for drag-and-drop
        filter={filter}
        searchTerm={searchTerm}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
