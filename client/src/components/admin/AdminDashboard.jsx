import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminProject from './AdminProject';
import AdminSkill from './AdminSkill';
import AdminJourney from './AdminJourney';
import { FaProjectDiagram, FaCode, FaRoad, FaSignOutAlt } from 'react-icons/fa';
import projectService from '../../services/projectService';
import skillService from '../../services/skillService';
import journeyService from '../../services/journeyService';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'skills') {
      fetchSkills();
    } else if (activeTab === 'journeys') {
      fetchJourneys();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const fetchSkills = async () => {
    try {
      const data = await skillService.getAllSkills();
      setSkills(data);
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const fetchJourneys = async () => {
    try {
      const data = await journeyService.getAllJourneys();
      setJourneys(data);
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
    setError(err.message || 'An error occurred');
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'skills', label: 'Skills', icon: <FaCode /> },
    { id: 'journeys', label: 'Journey', icon: <FaRoad /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className={`
          bg-white shadow-md w-full lg:w-64 transition-all duration-300
          ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}
        `}>
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6 hidden lg:block">Admin Panel</h2>
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'projects' && (
              <AdminProject
                projects={projects}
                onUpdate={fetchProjects}
              />
            )}
            {activeTab === 'skills' && (
              <AdminSkill
                skills={skills}
                onUpdate={fetchSkills}
              />
            )}
            {activeTab === 'journeys' && (
              <AdminJourney
                journeys={journeys}
                onUpdate={fetchJourneys}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}