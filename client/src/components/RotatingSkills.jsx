import { useEffect, useRef } from 'react';

const skills = [
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Git', icon: 'fab fa-git-alt' },
  { name: 'Database', icon: 'fas fa-database' },
  // Duplicate skills for continuous scrolling effect
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'Tailwind', icon: 'fab fa-css3-alt' },
  { name: 'Material UI', icon: 'fab fa-css3-alt' },
  { name: 'Express', icon: 'fab fa-css3-alt' },
  { name: 'MongoDB', icon: 'fab fa-css3-alt' },
];

const RotatingSkills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const animationDuration = 5; // seconds

    container.style.setProperty('--scroll-width', `${scrollWidth}px`);
    container.style.setProperty('--animation-duration', `${animationDuration}s`);

    // Add animation
    container.style.animation = `scroll var(--animation-duration) linear infinite`;
  }, []);

  return (
    <div className="w-full bg-gray-900/30 backdrop-blur-sm py-4 overflow-hidden">
      <div
        ref={containerRef}
        className="flex space-x-8 px-2 animate-scroll"
      >
        {skills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex flex-col items-center justify-center p-4 bg-white/90 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:bg-white cursor-pointer min-w-[100px]"
          >
            <i className={`${skill.icon} text-xl text-blue-500 mb-2`}></i>
            <span className="text-sm from-neutral-50 text-gray-700">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingSkills;