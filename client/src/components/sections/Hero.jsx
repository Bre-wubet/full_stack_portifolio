import useRotatingAnimation from '../../hooks/useRotatingAnimation';
import useRoleSwitcher from '../../hooks/useRoleSwitcher';
import imageUrl from '../../assets/brena.jpg';

const Hero = () => {
  const ellipseRef = useRotatingAnimation();
  const role = useRoleSwitcher({
    roles: ['Fullstack Developer', 'Software Engineer', 'UI/UX Designer'],
  });

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-300 bg-no-repeat overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-2 lg:px-8 relative z-10">
        <div className="flex min-h-48 flex-col justify-between space-y-8 lg:min-h-56 lg:max-w-[33.75rem]">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Hi - I'm Brhina Wubet</h1>
            <span className="block text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1CDAFF] to-blue-400 bg-clip-text text-transparent animate-pulse">{role}</span>
            <h2 className="text-xl text-white md:text-2xl">
              Crafting innovative solutions to solve real-world problems
            </h2>
          </div>

          
        </div>

        <div className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem] animate-[float_6s_ease-in-out_infinite]">
            <img
              src={imageUrl}
              alt="Brhina Wubet - Full Stack Developer"
              className="absolute left-0 top-0 h-full w-full object-contain p-7 rounded-[40%] overflow-hidden shadow-[0_0_40px_8px_rgba(28,218,255,0.2)] transition-all duration-300 hover:shadow-[0_0_60px_12px_rgba(28,218,255,0.3)]"
            />
            <div
              ref={ellipseRef}
              className="absolute left-0 top-0 h-full w-full will-change-transform"
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 412 413"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="206"
                  cy="206.401"
                  r="204.5"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="18 36 54 72"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1CDAFF" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
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
              aria-label="View LinkedIn Profile"
              className="group relative px-6 py-3 text-lg font-semibold text-white overflow-hidden rounded-xl bg-blue-700 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(29,78,216,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              <span className="relative z-10">LinkedIn Profile</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-transform duration-300 ease-out group-hover:scale-100 bg-gradient-to-r from-blue-700 to-blue-500"></div>
            </a>
          </div>
      </div>
    </section>
  );
};

export default Hero;