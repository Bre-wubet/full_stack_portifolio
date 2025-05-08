
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    githubLink: '',
    liveDemo: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
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

      <form onSubmit={handleAddProject} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            required
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2 h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
          <input
            placeholder="GitHub Repository URL"
            value={form.githubLink}
            onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
          <input
            placeholder="Live Demo URL"
            value={form.liveDemo}
            onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {form.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, tags: form.tags.filter((_, i) => i !== index) })}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Add a tag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="block flex-1 border-blue-200 border-2 rounded p-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (currentTag.trim() && !form.tags.includes(currentTag.trim())) {
                    setForm({ ...form, tags: [...form.tags, currentTag.trim()] });
                    setCurrentTag('');
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (currentTag.trim() && !form.tags.includes(currentTag.trim())) {
                  setForm({ ...form, tags: [...form.tags, currentTag.trim()] });
                  setCurrentTag('');
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj._id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
            {proj.imageUrl && (
              <img src={proj.imageUrl} alt={proj.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
              <p className="text-gray-600 mb-4">{proj.description}</p>
              
              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-4">
                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {proj.liveDemo && (
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}