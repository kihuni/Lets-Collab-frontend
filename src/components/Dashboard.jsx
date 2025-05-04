// src/components/Dashboard.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';

function Dashboard({ token }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [error, setError] = useState('');

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('https://lets-collab-api.onrender.com/api/projects/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (err) {
      setError(`Failed to fetch projects: ${err.message}`); // Use err.message for specificity
    }
  }, [token]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('https://lets-collab-api.onrender.com/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      setError(`Failed to fetch tasks: ${err.message}`); // Use err.message
    }
  }, [token]);

  const createProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) {
      setError('Project name cannot be empty.');
      return;
    }
    try {
      await axios.post(
        'https://lets-collab-api.onrender.com/api/projects/',
        { name: newProjectName, owner: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProjectName('');
      setError(''); // Clear error on success
      fetchProjects();
    } catch (err) {
      setError(`Failed to create project: ${err.message}`); // Use err.message
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !newTaskTitle.trim()) {
      setError('Please select a project and enter a task title.');
      return;
    }
    try {
      await axios.post(
        'https://lets-collab-api.onrender.com/api/tasks/',
        { project: selectedProjectId, title: newTaskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTaskTitle('');
      setSelectedProjectId('');
      setError(''); // Clear error on success
      fetchTasks();
    } catch (err) {
      setError(`Failed to create task: ${err.message}`); // Use err.message
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, [fetchProjects, fetchTasks]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Projects</h3>
        {projects.length ? (
          <ul className={styles.list}>
            {projects.map((project) => (
              <li key={project.id} className={styles.listItem}>
                {project.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noItems}>No projects available.</p>
        )}
        <form onSubmit={createProject} className={styles.form}>
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project name"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Create Project</button>
        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Tasks</h3>
        {tasks.length ? (
          <ul className={styles.list}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.listItem}>
                {task.title} (Project ID: {task.project})
                {task.access_expires && new Date(task.access_expires) < new Date() && (
                  <span className={styles.expired}> (Expired)</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noItems}>No tasks available.</p>
        )}
        <form onSubmit={createTask} className={styles.form}>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className={styles.input}
            required
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;