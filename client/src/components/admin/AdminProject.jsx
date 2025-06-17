import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCloudUploadAlt, FaEdit, FaTrash } from 'react-icons/fa';
import projectService from '../../services/projectService';

export default function AdminProject({ projects = [], onUpdate }) {
  const [error, setError] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    publicId: '',
    githubLink: '',
    liveDemo: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Ensure projects is always an array and each project has required fields
  const safeProjects = Array.isArray(projects) ? projects.filter(project => 
    project && 
    typeof project === 'object' && 
    project._id && 
    project.title
  ) : [];

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
      const { imageUrl, publicId } = await projectService.uploadImage(file);
      setProjectForm({ ...projectForm, imageUrl, publicId });
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !projectForm.tags.includes(currentTag.trim())) {
      setProjectForm({
        ...projectForm,
        tags: [...projectForm.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProjectForm({
      ...projectForm,
      tags: projectForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await projectService.updateProject(editingId, projectForm);
      } else {
        await projectService.addProject(projectForm);
      }
      setProjectForm({
        title: '',
        description: '',
        imageUrl: '',
        publicId: '',
        githubLink: '',
        liveDemo: '',
        tags: []
      });
      setIsEditing(false);
      setEditingId(null);
      setError('');
      setIsFormVisible(false);
      onUpdate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      publicId: project.publicId,
      githubLink: project.githubLink,
      liveDemo: project.liveDemo,
      tags: project.tags || []
    });
    setIsEditing(true);
    setEditingId(project._id);
    setIsFormVisible(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        onUpdate();
      } catch (err) {
        handleError(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isFormVisible ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isFormVisible && (
        <form onSubmit={handleAddProject} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
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
                  className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  <FaCloudUploadAlt />
                  <span>Upload Image</span>
                </label>
                {projectForm.imageUrl && (
                  <img
                    src={projectForm.imageUrl}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
              <input
                type="url"
                value={projectForm.githubLink}
                onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo</label>
              <input
                type="url"
                value={projectForm.liveDemo}
                onChange={(e) => setProjectForm({ ...projectForm, liveDemo: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {projectForm.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsFormVisible(false);
                setIsEditing(false);
                setEditingId(null);
                setProjectForm({
                  title: '',
                  description: '',
                  imageUrl: '',
                  publicId: '',
                  githubLink: '',
                  liveDemo: '',
                  tags: []
                });
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeProjects.length > 0 ? (
          safeProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={project.imageUrl || ''}
                  alt={project.title || 'Project image'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description || ''}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500"
                      >
                        <FaGithub className="text-xl" />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No projects found. Add your first project!
          </div>
        )}
      </div>
    </div>
  );
}