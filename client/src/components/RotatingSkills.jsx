import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const RotatingSkills = ({ skills = [] }) => {
  const containerRef = useRef(null);

  // Ensure skills is always an array and has at least one item
  const safeSkills = Array.isArray(skills) && skills.length > 0 
    ? skills 
    : ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'];

  // Duplicate skills for smooth scrolling
  const duplicatedSkills = [...safeSkills, ...safeSkills];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex space-x-8 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0"
          >
            <span className="text-blue-400 font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RotatingSkills;