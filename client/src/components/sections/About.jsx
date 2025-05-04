

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">About Me</h2>
        <p className="text-center text-text/70 mb-12">
          Passionate about creating impactful solutions through code
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm a full-stack developer with a strong focus on creating scalable and user-friendly applications. My journey in tech is driven by a passion for solving complex problems and helping others through technology.
            </p>
            <p className="text-lg leading-relaxed">
              With expertise in both frontend and backend development, I enjoy building complete solutions that make a real difference. I'm particularly interested in educational technology and creating tools that help students learn more effectively.
            </p>
          </div>
          {/* <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Python', 'MongoDB', 'SQL', 'AWS', 'Docker', 'TypeScript', 'Tailwind CSS'].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-background text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;