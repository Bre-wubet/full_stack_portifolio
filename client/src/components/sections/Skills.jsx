// import React from 'react';
// import { motion } from 'framer-motion';
// import image from '../../assets/brena.jpg'; // Adjust the path as necessary
// import {
//   SiReact,
//   SiMongodb,
//   SiNodedotjs,
//   SiExpress,
//   SiHtml5,
//   SiCss3,
//   SiJavascript,
//   SiTailwindcss,
//   SiGit,
//   SiLinux,
//   SiDocker
// } from 'react-icons/si';
// import { FaJava } from 'react-icons/fa';

// const skills = [
//   { name: "React", icon: <SiReact title="React" /> },
//   { name: "MongoDB", icon: <SiMongodb title="MongoDB" /> },
//   { name: "Node.js", icon: <SiNodedotjs title="Node.js" /> },
//   { name: "Express", icon: <SiExpress title="Express" /> },
//   { name: "Java", icon: <FaJava title="Java" /> },
//   { name: "HTML", icon: <SiHtml5 title="HTML" /> },
//   { name: "CSS", icon: <SiCss3 title="CSS" /> },
//   { name: "JavaScript", icon: <SiJavascript title="JavaScript" /> },
//   { name: "Tailwind", icon: <SiTailwindcss title="Tailwind CSS" /> },
//   { name: "Git", icon: <SiGit title="Git" /> },
//   { name: "Linux", icon: <SiLinux title="Linux" /> },
//   { name: "Docker", icon: <SiDocker title="Docker" /> },
// ];

// const SkillsScroller = () => {
//   return (
//     <div className="w-full bg-gray-200 flex flex-col items-center justify-center">
//       {/* Full-width Image */}
//       <img
//         src={image} // Replace with your image path
//         alt="Skills Banner"
//         className="w-full object-cover h-20" // Adjust height as needed
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       />

//         {/* Animated Skill Icons Scroller */}
//         <div className="py-6 bg-gray-100 relative overflow-hidden">
//         <motion.div
//           className="flex gap-8 animate-scroll"
//           style={{
//             animation: 'scroll 25s linear infinite',
//             minWidth: '200%'
//           }}
//         >
//           {skills.concat(skills).map((skill, index) => (
//             <motion.div
//               key={index}
//               className="text-3xl text-gray-700 hover:text-blue-500 transition-colors duration-300"
//               title={skill.name}
//               whileHover={{ scale: 1.2 }}
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1, duration: 0.6 }}
//             >
//               {skill.icon}
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Scroll Animation Keyframes */}
//       <style>{`
//         @keyframes scroll {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-50%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SkillsScroller;
import React from 'react';

const skills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'MongoDB', level: 75 },
  { name: 'SQL', level: 70 },
  { name: 'AWS', level: 65 },
  { name: 'Docker', level: 60 },
  { name: 'TypeScript', level: 85 },
  { name: 'Tailwind CSS', level: 90 },
];

export default function SkillsBar() {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Technical Skills</h2>
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
            <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

