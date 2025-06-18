import { useState, useEffect } from 'react';
import resumeService from '../services/resumeService';

const useResume = () => {
  const [resumeData, setResumeData] = useState({
    url: null,
    exists: false,
    loading: true,
    error: null
  });

  const fetchResume = async () => {
    try {
      setResumeData(prev => ({ ...prev, loading: true, error: null }));
      const data = await resumeService.getResume();
      setResumeData({
        url: data.url || null,
        exists: data.exists || false,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching resume:', error);
      setResumeData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch resume'
      }));
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return resumeData;
};

export default useResume; 