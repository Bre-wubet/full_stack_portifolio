import { useEffect, useRef } from 'react';

const skills = [
  { name: 'React', icon: 'fab fa-react', color: 'text-blue-500' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-500' },
  { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
  { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-500' },
  { name: 'MongoDB', icon: 'fas fa-database', color: 'text-green-600' },
  { name: 'Express', icon: 'fas fa-server', color: 'text-gray-700' },
  { name: 'Tailwind', icon: 'fab fa-css3-alt', color: 'text-cyan-500' },
  { name: 'Material UI', icon: 'fab fa-react', color: 'text-blue-400' },
  { name: 'TypeScript', icon: 'fab fa-js', color: 'text-blue-600' },
  { name: 'Python', icon: 'fab fa-python', color: 'text-blue-600' },
  { name: 'Docker', icon: 'fab fa-docker', color: 'text-blue-700' },
  { name: 'AWS', icon: 'fab fa-aws', color: 'text-orange-600' },
];

const RotatingSkills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const animationDuration = 20; // Increased duration for smoother scrolling

    container.style.setProperty('--scroll-width', `${scrollWidth}px`);
    container.style.setProperty('--animation-duration', `${animationDuration}s`);

    // Add animation
    container.style.animation = `scroll var(--animation-duration) linear infinite`;
  }, []);

  return (
    <div className="w-full bg-gray-900/20 backdrop-blur-sm py-2 overflow-hidden">
      <div
        ref={containerRef}
        className="flex space-x-6 py-0 px-4 animate-scroll"
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex flex-col items-center justify-center p-4 bg-white/90 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white cursor-pointer min-w-[100px]"
          >
            <i className={`${skill.icon} text-2xl ${skill.color} mb-2`}></i>
            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingSkills;