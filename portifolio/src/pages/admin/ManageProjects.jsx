import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../../services/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchProjects}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-text">Manage Projects</h2>
        <Link
          to="/admin/dashboard/new"
          className="px-2 py-2 mx-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 hover:text-primary transition-colors"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-200 rounded-lg">
          <p className="text-gray-400 mb-4">No projects found</p>
          <Link
            to="/admin/dashboard/new"
            className="text-primary hover:text-primary/90 transition-colors"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-text mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/admin/dashboard/edit/${project._id}`}
                    className="text-primary hover:text-primary/90 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProjects;