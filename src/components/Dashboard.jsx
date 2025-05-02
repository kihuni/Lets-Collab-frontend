// src/components/Dashboard.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import  './Dashboard.module.css';

function Dashboard({ token }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [error, setError] = useState('');

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/projects/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch {
      setError('Failed to fetch projects. Check permissions.');
    }
  }, [token]); // Dependencies: token

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch {
      setError('Failed to fetch tasks. Check permissions.');
    }
  }, [token]); // Dependencies: token

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8000/api/projects/',
        { name: newProjectName, owner: 1 }, // Assuming admin user ID is 1
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProjectName('');
      fetchProjects();
    } catch {
      setError('Failed to create project. Check permissions.');
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!selectedProject) {
      setError('Please select a project.');
      return;
    }
    try {
      await axios.post(
        'http://localhost:8000/api/tasks/',
        { project: selectedProject, title: newTaskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTaskTitle('');
      setSelectedProject('');
      fetchTasks();
    } catch {
      setError('Failed to create task. Check permissions.');
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, [fetchProjects, fetchTasks]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Create Project */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Create Project</h3>
        <form onSubmit={createProject} className="flex space-x-4">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project Name"
            className="flex-1 p-2 border rounded-md"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Create
          </button>
        </form>
      </div>

      {/* Create Task */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Create Task</h3>
        <form onSubmit={createTask} className="flex space-x-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="p-2 border rounded-md"
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
            placeholder="Task Title"
            className="flex-1 p-2 border rounded-md"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Create
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Projects</h3>
        {projects.length ? (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id} className="bg-white p-4 rounded-lg shadow-md">
                {project.name} (Created: {new Date(project.created_at).toLocaleDateString()})
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects available.</p>
        )}
      </div>

      {/* Tasks List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Tasks</h3>
        {tasks.length ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
                {task.title} (Project ID: {task.project})
                {task.access_expires && (
                  <span className="ml-2 text-sm text-gray-500">
                    (Expires: {new Date(task.access_expires).toLocaleDateString()})
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;