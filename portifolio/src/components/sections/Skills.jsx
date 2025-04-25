import React from 'react';

const skills = [
  "React", "MongoDB", "Node.js", "Express", "Java", "HTML", "CSS", "JavaScript", "Tailwind", "Git", "Linux", "Docker"
];

const SkillsScroller = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-gray-100">
      <div className="animate-scroll inline-block min-w-full">
        {skills.concat(skills).map((skill, index) => (
          <span
            key={index}
            className="text-lg font-medium text-gray-700 inline-block mx-6"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsScroller;
