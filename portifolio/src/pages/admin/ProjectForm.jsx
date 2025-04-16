import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../../services/api';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    imageUrl: '',
    githubUrl: '',
    liveDemoUrl: ''
  });
  const [techInput, setTechInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await projectService.getProject(id);
      setFormData(data);
      setImagePreview(data.imageUrl);
    } catch (err) {
      setError('Failed to fetch project');
      console.error('Error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    if (techInput.trim()) {
      if (!formData.techStack.includes(techInput.trim())) {
        setFormData(prev => ({
          ...prev,
          techStack: [...prev.techStack, techInput.trim()]
        }));
        setTechInput('');
      }
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    const requiredFields = ['title', 'description', 'githubUrl', 'liveDemoUrl'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }

    if (!formData.techStack) {
      setError('Please add at least one technology to the tech stack');
      setLoading(false);
      return;
    }

    if (!imageFile && !formData.imageUrl) {
      setError('Please upload a project image');
      setLoading(false);
      return;
    }

    try {
      const formDataObj = new FormData();
      
      // Append all form fields
      formDataObj.append('title', formData.title.trim());
      formDataObj.append('description', formData.description.trim());
      formDataObj.append('techStack', formData.techStack);
      formDataObj.append('githubUrl', formData.githubUrl.trim());
      formDataObj.append('liveDemoUrl', formData.liveDemoUrl.trim());

      // Handle image upload
      if (imageFile) {
        formDataObj.append('image', imageFile);
      } else if (formData.imageUrl) {
        formDataObj.append('imageUrl', formData.imageUrl);
      }

      let data;
      if (id) {
        data = await projectService.updateProject(id, formDataObj);
      } else {
        data = await projectService.createProject(formDataObj);
      }

      navigate('/admin/dashboard/manage');
    } catch (err) {
      setError(err.message || 'Failed to save project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-text mb-8">
        {id ? 'Edit Project' : 'Add New Project'}
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-text mb-2" htmlFor="title">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-700 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-text mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-700 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
        </div>

        <div>
          <label className="block text-text mb-2">
            Tech Stack
          </label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {formData.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-primary rounded-full flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="text-black hover:text-primary/70"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-200 border border-gray-700 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Add technology"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 bg-gray-500 text-black rounded-lg hover:bg-primary transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-text mb-2">
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <label className="block text-text mb-2" htmlFor="githubUrl">
            GitHub URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-700 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-text mb-2" htmlFor="liveDemoUrl">
            Live Demo URL
          </label>
          <input
            type="url"
            id="liveDemoUrl"
            name="liveDemoUrl"
            value={formData.liveDemoUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-700 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard/manage')}
            className="px-4 py-2 text-text hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gray-500 text-black rounded-lg hover:bg-primary/100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;