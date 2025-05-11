import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import projectService from '../../services/projectService';

export default function AdminProject() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    githubLink: '',
    liveDemo: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');

  const fetchProjects = async () => {
    try {
      const projects = await projectService.getAllProjects();
      setProjects(projects);
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    setError(err.message || 'An error occurred');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      const imageUrl = await projectService.uploadImage(formData);
      setProjectForm({ ...projectForm, imageUrl });
      setError('');
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.addProject(projectForm);
      setProjectForm({
        title: '',
        description: '',
        imageUrl: '',
        githubLink: '',
        liveDemo: '',
        tags: []
      });
      setError('');
      fetchProjects();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectService.deleteProject(id);
      setError('');
      fetchProjects();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className='m-4'>
      <form onSubmit={handleAddProject} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            required
            placeholder="Project Title"
            value={projectForm.title}
            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Project Description"
            value={projectForm.description}
            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2 h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center px-4 py-2 border border-blue-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <FaCloudUploadAlt className="mr-2" />
              Upload Image
            </label>
            {projectForm.imageUrl && (
              <div className="flex-1 text-sm text-gray-500 truncate">
                Image uploaded successfully
              </div>
            )}
          </div>
          {projectForm.imageUrl && (
            <div className="mt-2">
              <img src={projectForm.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
          <input
            placeholder="GitHub Repository URL"
            value={projectForm.githubLink}
            onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
          <input
            placeholder="Live Demo URL"
            value={projectForm.liveDemo}
            onChange={(e) => setProjectForm({ ...projectForm, liveDemo: e.target.value })}
            className="block w-full border-blue-200 border-2 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {projectForm.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setProjectForm({
                    ...projectForm,
                    tags: projectForm.tags.filter((_, i) => i !== index)
                  })}
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
                  if (currentTag.trim()) {
                    setProjectForm({
                      ...projectForm,
                      tags: [...projectForm.tags, currentTag.trim()]
                    });
                    setCurrentTag('');
                  }
                }
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="border rounded-lg p-4">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaExternalLinkAlt size={20} />
                  </a>
                )}
              </div>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}