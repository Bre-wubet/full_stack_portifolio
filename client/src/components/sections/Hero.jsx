import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import RotatingSkills from '../RotatingSkills';
import ResumeButton from '../ResumeButton';
import useResume from '../../hooks/useResume';

const Hero = () => {
  const resumeData = useResume();

  const handleResumeClick = () => {
    if (resumeData.url) {
      window.open(resumeData.url, '_blank');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
              Hi, I'm{' '}
            <span className="text-blue-500">Brie Wubet</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            <Typewriter
              words={[
                'Full Stack Developer',
                'React Developer',
                'Node.js Developer',
                'MongoDB Developer',
                'UI/UX Enthusiast'
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <RotatingSkills />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <ResumeButton 
              resumeData={resumeData} 
              onResumeClick={handleResumeClick} 
            />
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>      
      </div>
    </section>
  );
};

export default Hero;