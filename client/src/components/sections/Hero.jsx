import useRotatingAnimation from '../../hooks/useRotatingAnimation';
import useRoleSwitcher from '../../hooks/useRoleSwitcher';
import imageUrl from '../../assets/brena.jpg';

const Hero = () => {
  const ellipseRef = useRotatingAnimation();
  const role = useRoleSwitcher({
    roles: ['Fullstack Developer', 'Software Engineer', 'UI/UX Designer'],
  });

  return (
    <section className="min-h-[calc(dvh-4rem)] bg-[#2D1B69] bg-no-repeat overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pb-10 pt-12 md:grid-cols-2 lg:p-4">
        <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="mb-2 block text-3xl font-bold text-white">Hi - I'm Brhina Wubet</span>
            <span className="block text-[1.75rem] font-bold text-[#1CDAFF]">{role}</span>
          </h1>

          <h2 className="mt-3 text-xl text-white">
            Crafting innovative solutions to solve real-world problems
          </h2>

          <div className="mt-6 flex flex-wrap gap-6">
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="min-w-32 cursor-pointer rounded-lg bg-[#1CDAFF] px-[14px] py-[10px] text-center text-sm font-medium text-[#2D1B69]"
            >
              Hire Me
            </button>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn Profile"
              className="cursor-pointer rounded-lg bg-[#3D2B79] px-[14px] py-[10px] text-sm text-white"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        <div className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <img
              src={imageUrl}
              alt="Brhina Wubet - Full Stack Developer"
              className="absolute left-0 top-0 h-full w-full object-contain p-7 rounded-[40%] overflow-hidden"
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
                  stroke="#1CDAFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="18 36 54 72"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;