
import imageUrl from '../../assets/animateimg.jpg';

import RotatingSkills from '../RotatingSkills';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-gray-100 to-blue-200 bg-no-repeat overflow-hidden relative py-6">
      
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-6 py-8 md:grid-cols-2 lg:px-8 relative z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-950 md:text-5xl lg:text-6xl">Hi - I'm Brhina Wubet</h1>
          <h2 className="text-xl text-gray-700 md:text-2xl">
            Empowering Communities Through Smart Code and Purposeful Innovation
          </h2>
          <h1 className='text-3xl font-bold'>Full stack Developer</h1>
          
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-blue-500 transition-colors">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-500 transition-colors">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-500 transition-colors">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-blue-500 transition-colors">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-6 py-3 text-lg font-semibold text-white overflow-hidden rounded-xl bg-[#1CDAFF] transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(28,218,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#1CDAFF] focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-transform duration-300 ease-out group-hover:scale-100 bg-gradient-to-r from-[#1CDAFF] to-blue-400"></div>
            </button>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 text-lg font-semibold text-white overflow-hidden rounded-xl bg-blue-700 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(29,78,216,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              <span className="relative z-10">LinkedIn Profile</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-transform duration-300 ease-out group-hover:scale-100 bg-gradient-to-r from-blue-700 to-blue-500"></div>
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <img
              src={imageUrl}
              alt="Brhina Wubet - Full Stack Developer"
              className="absolute left-0 top-0 h-full w-full object-contain p-7 rounded-[40%] overflow-hidden shadow-[0_0_40px_8px_rgba(28,218,255,0.2)] transition-all duration-300 hover:shadow-[0_0_60px_12px_rgba(28,218,255,0.3)]"
            />
           
          </div>
        </div>      
      </div>
      <RotatingSkills />
    </section>
  );
};

export default Hero;