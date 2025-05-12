
import { useState, useEffect } from 'react';
import AdminProject from './AdminProject';
import AdminSkill from './AdminSkill';
import AdminJourney from './AdminJourney';
import Sidebar from './Sidebar';
import projectService from '../../services/projectService';
import skillService from '../../services/skillService';
import journeyService from '../../services/journeyService';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [journeys, setJourneys] = useState([]);

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
      window.location.href = '/admin';
    }
    setError(err.message || 'An error occurred');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {activeTab === 'projects' && <AdminProject projects={projects} onUpdate={fetchProjects} />}
        {activeTab === 'skills' && <AdminSkill skills={skills} onUpdate={fetchSkills} />}
        {activeTab === 'journeys' && <AdminJourney onUpdate={fetchJourneys} />}
      </main>
    </div>
  );
}