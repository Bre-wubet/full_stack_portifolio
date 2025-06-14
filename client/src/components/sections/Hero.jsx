import { useEffect, useRef } from 'react';
import imageUrl from '../../assets/animateimg.jpg';
import RotatingSkills from '../RotatingSkills';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    };

    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    };

    const image = imageRef.current;
    if (image) {
      image.addEventListener('mousemove', handleMouseMove);
      image.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (image) {
        image.removeEventListener('mousemove', handleMouseMove);
        image.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-200 bg-no-repeat overflow-hidden relative py-12 sm:py-16 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 sm:gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8 relative z-10">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Brhina Wubet
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold">
              Full Stack Developer
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              Empowering Communities Through Smart Code and Purposeful Innovation
            </p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex gap-4 sm:gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-blue-500 transition-all duration-300 hover:scale-110">
              <FaGithub className="text-2xl sm:text-3xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-500 transition-all duration-300 hover:scale-110">
              <FaLinkedin className="text-2xl sm:text-3xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-500 transition-all duration-300 hover:scale-110">
              <FaTwitter className="text-2xl sm:text-3xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-500 transition-all duration-300 hover:scale-110">
              <FaInstagram className="text-2xl sm:text-3xl" />
            </a>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(28,218,255,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-transform duration-300 ease-out group-hover:scale-100 bg-gradient-to-r from-blue-500 to-blue-300"></div>
            </button>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(29,78,216,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <span className="relative z-10">LinkedIn Profile</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-transform duration-300 ease-out group-hover:scale-100 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[20rem] sm:min-h-[25rem] items-center justify-center lg:min-h-[35rem]">
          <div 
            ref={imageRef}
            className="relative size-56 sm:size-64 md:size-72 lg:size-96 transition-transform duration-300 ease-out"
          >
            <img
              src={imageUrl}
              alt="Brhina Wubet - Full Stack Developer"
              className="absolute left-0 top-0 h-full w-full object-cover rounded-[40%] overflow-hidden shadow-[0_0_40px_8px_rgba(28,218,255,0.2)] transition-all duration-300 hover:shadow-[0_0_60px_12px_rgba(28,218,255,0.3)]"
            />
            <div className="absolute inset-0 rounded-[40%] bg-gradient-to-tr from-blue-500/20 to-transparent mix-blend-overlay"></div>
          </div>
        </div>      
      </div>
      <RotatingSkills />
    </section>
  );
};

export default Hero;