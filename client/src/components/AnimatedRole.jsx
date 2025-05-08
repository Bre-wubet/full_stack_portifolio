// Place this ABOVE the Hero component
import { useEffect, useState } from 'react';

const roles = ['Backend Developer', 'Frontend Developer'];

const AnimatedRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  const currentRole = roles[roleIndex];
  const words = currentRole.split(' ');

  useEffect(() => {
    if (visibleWordCount < words.length) {
      const wordTimer = setTimeout(() => {
        setVisibleWordCount((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(wordTimer);
    } else {
      const roleTimer = setTimeout(() => {
        setVisibleWordCount(0);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1500);
      return () => clearTimeout(roleTimer);
    }
  }, [visibleWordCount, words.length]);

  return (
    <span className="block text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1CDAFF] to-blue-400 bg-clip-text text-transparent">
      {words.slice(0, visibleWordCount).join(' ')}
    </span>
  );
};

export default AnimatedRole;