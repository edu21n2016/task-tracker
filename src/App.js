import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { DragDropContext } from '@hello-pangea/dnd';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
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
      dueDate: dueDate || null,
      priority,
    };
    setTasks(prev => [...prev, newTask]);
    setInputValue('');
    setDueDate('');
    setPriority('medium');
  };

  // ✅ Drag and drop handler
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTasks(items);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, text: newText } : t)));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'active' && !task.completed);
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="App">
      <h1 className="app-title">🌸 My Task Tracker</h1>

      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="✍️ Add a new task..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </DragDropContext>

      {filteredTasks.length === 0 && (
        <p className="empty-msg">✨ No tasks yet. Add one to get started!</p>
      )}
    </div>
  );
}

export default App;
