import { useState, useEffect } from 'react';

const useRoleSwitcher = ({ roles = [], interval = 3000 }) => {
  const [currentRole, setCurrentRole] = useState(roles[0] || '');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % roles.length;
        setCurrentRole(roles[nextIndex]);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [roles, interval]);

  return currentRole;
};

export default useRoleSwitcher;