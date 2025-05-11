
import { useState } from 'react';
import AdminProject from './AdminProject';
import AdminSkill from './AdminSkill';
import AdminJourney from './AdminJourney';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [error, setError] = useState('');

  return (
    <div className="p-6 m-10 sm:m-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['projects', 'skills', 'journeys'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'projects' && <AdminProject />}
      {activeTab === 'skills' && <AdminSkill />}
      {activeTab === 'journeys' && <AdminJourney />}
    </div>
  );
}