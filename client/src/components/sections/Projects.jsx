import { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
import projectService from '../../services/projectService';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const ProjectSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6 space-y-4">
        <div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="h-4 bg-gray-200 rounded max-w-2xl mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:text-[#1CDAFF] transition-colors duration-300">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;