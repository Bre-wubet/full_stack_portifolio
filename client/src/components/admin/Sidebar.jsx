import React, { useState } from 'react';
import { FaProjectDiagram, FaLaptopCode, FaHistory, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { id: 'projects', icon: <FaProjectDiagram className="w-5 h-5" />, label: 'Projects' },
    { id: 'skills', icon: <FaLaptopCode className="w-5 h-5" />, label: 'Skills' },
    { id: 'journeys', icon: <FaHistory className="w-5 h-5" />, label: 'Journeys' }
  ];

  return (
    <div
      className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-sky-50 border-r border-gray-200 fixed left-0 top-0 transition-all duration-300 ease-in-out shadow-lg z-50`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden absolute right-0 top-0 m-4 text-gray-600 hover:text-gray-900"
      >
        {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
      </button>

      <div className={`p-6 ${isCollapsed ? 'px-2' : ''}`}>
        <h2 className={`text-xl font-bold mb-8 transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          {!isCollapsed && 'Admin Dashboard'}
        </h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } flex items-center w-full px-4 py-3 text-sm font-medium rounded-r transition-all duration-150 ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              title={isCollapsed ? tab.label : ''}
            >
              <span className="flex-shrink-0">{tab.icon}</span>
              <span className={`ml-3 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                {!isCollapsed && tab.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}