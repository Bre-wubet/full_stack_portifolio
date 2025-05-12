

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import skillService from '../../services/skillService';
import journeyService from '../../services/journeyService';

const About = () => {
  const [activeTab, setActiveTab] = useState('journey');

  const tabs = [
    { id: 'journey', label: 'My Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'interests', label: 'Interests' }
  ];

  const [journeyItems, setJourneyItems] = useState([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const data = await journeyService.getAllJourneys();
        setJourneyItems(data);
      } catch (error) {
        console.error('Error fetching journeys:', error);
      }
    };
    fetchJourneys();
  }, []);

  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillService.getAllSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError('Failed to load skills');
        console.error('Error fetching skills:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const interests = [
    {
      title: 'Technology Innovation',
      description: 'Passionate about exploring new technologies and their potential to solve real-world problems.'
    },
    {
      title: 'Open Source',
      description: 'Contributing to and learning from the open-source community.'
    },
    {
      title: 'Continuous Learning',
      description: 'Always eager to learn new programming languages and frameworks.'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:text-blue-400 transition-colors duration-300">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A passionate full-stack developer dedicated to creating innovative web solutions
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-white rounded-lg shadow-md p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-400 text-white'
                    : 'text-gray-600 hover:text-blue-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {activeTab === 'journey' && (
            <motion.div 
              className="space-y-8"
              {...fadeInUp}
            >
              {journeyItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24 text-blue-400 font-bold">{item.year}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div 
              className="space-y-6"
              {...fadeInUp}
            >
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'interests' && (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              {...fadeInUp}
            >
              {interests.map((interest, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{interest.title}</h3>
                  <p className="text-gray-600">{interest.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;