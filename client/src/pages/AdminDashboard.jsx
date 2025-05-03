
import { useEffect, useState } from 'react';
import API from '../api';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', githubLink: '' });

  const fetchProjects = async () => {
    const res = await API.get('/projects');
    setProjects(res.data);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    await API.post('/projects', form);
    setForm({ title: '', description: '', githubLink: '' });
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      <form onSubmit={handleAddProject} className="mb-8">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="block mb-2 border p-2 w-full" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="block mb-2 border p-2 w-full" />
        <input placeholder="GitHub Link" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} className="block mb-2 border p-2 w-full" />
        <button className="bg-green-600 text-white px-4 py-2">Add Project</button>
      </form>

      <ul>
        {projects.map((proj) => (
          <li key={proj._id} className="mb-4 border p-4 rounded">
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

// Removed duplicate export default statement