import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Check, Filter, Sparkles } from 'lucide-react';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Initialize Vite React project structure', tag: 'vite', completed: true },
    { id: 2, text: 'Design dark & light modern glassmorphism design system', tag: 'css', completed: true },
    { id: 3, text: 'Create interactive React component playground', tag: 'react', completed: true },
    { id: 4, text: 'Integrate live task manager state hooks', tag: 'react', completed: false },
    { id: 5, text: 'Deploy product showcase build to production', tag: 'vite', completed: false },
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTag, setNewTaskTag] = useState('react');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      tag: newTaskTag,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="glass-card">
      <div className="task-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CheckSquare size={24} style={{ color: 'var(--accent-primary)' }} />
          <div>
            <h2>Project Roadmap & Task Tracker</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Manage deliverables, track milestone completion, and manage task lifecycle.
            </p>
          </div>
        </div>

        <div style={{ width: '160px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>Roadmap</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="task-input-bar">
        <input
          type="text"
          className="input-field"
          placeholder="Add a new task or feature item..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <select
          className="input-field"
          style={{ width: '120px' }}
          value={newTaskTag}
          onChange={(e) => setNewTaskTag(e.target.value)}
        >
          <option value="react">React</option>
          <option value="vite">Vite</option>
          <option value="css">CSS</option>
        </select>
        <button type="submit" className="btn btn-primary">
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-secondary ${filter === f ? 'btn-primary' : ''}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {completedCount} of {tasks.length} completed
        </span>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No tasks found in this view.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-left">
                <div className="checkbox-custom" onClick={() => toggleTask(task.id)}>
                  {task.completed && <Check size={14} />}
                </div>
                <span className="task-text">{task.text}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className={`task-tag tag-${task.tag}`}>{task.tag}</span>
                <button
                  className="icon-btn"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => deleteTask(task.id)}
                  title="Delete Task"
                >
                  <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
