
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', githubLink: '' });
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const projects = await projectService.getAllProjects();
      setProjects(projects);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
      setError('Failed to fetch projects');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.addProject(form);
      setForm({ title: '', description: '', githubLink: '' });
      setError('');
      fetchProjects();
    } catch (err) {
      if (err.message === 'Please login as admin to add projects') {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
      setError(err.message || 'Failed to add project');
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectService.deleteProject(id);
      setError('');
      fetchProjects();
    } catch (err) {
      if (err.message === 'Please login as admin to delete projects') {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
      setError(err.message || 'Failed to delete project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleAddProject} className="mb-8">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="block mb-2 border-blue-200 border-2 rounded p-2 w-full" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="block mb-2  border-blue-200 border-2 rounded p-2 w-full" />
        <input placeholder="GitHub Link" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} className="block mb-2  border-blue-200 border-2 rounded p-2 w-full" />
        <button className="bg-blue-500 w-full text-white px-4 py-2 my-4 rounded">Add Project</button>
      </form>

      <ul>
        {projects.map((proj) => (
          <li key={proj._id} className="mb-4 border-blue-100 border-2 rounded p-4">
            <h3 className="font-semibold">{proj.title}</h3>
            <p>{proj.description}</p>
            <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-blue-500">GitHub</a>
            <button onClick={() => handleDelete(proj._id)} className="ml-4 text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}