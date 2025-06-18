import React from 'react';
import { motion } from 'framer-motion';

const ResumeButton = ({ resumeData, onResumeClick }) => {
  if (resumeData.loading) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium"
        disabled
      >
        Loading...
      </motion.button>
    );
  }

  if (!resumeData.exists) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onResumeClick}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
      View Resume
    </motion.button>
  );
};

export default ResumeButton; 