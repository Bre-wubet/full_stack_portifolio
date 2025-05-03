import { useEffect, useRef } from 'react';

const useRotatingAnimation = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrame;
    let rotation = 0;

    const animate = () => {
      rotation = (rotation + 0.5) % 360;
      element.style.transform = `rotate(${rotation}deg)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return elementRef;
};

export default useRotatingAnimation;