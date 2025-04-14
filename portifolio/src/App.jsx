import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/admin/Register';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ProjectForm from './pages/admin/ProjectForm';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import './App.css';

const HomePage = () => {
  const sampleProjects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, and secure payments.",
      imageUrl: "https://placehold.co/600x400/7E22CE/ffffff?text=E-commerce",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "#",
      liveDemoUrl: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      imageUrl: "https://placehold.co/600x400/A855F7/ffffff?text=Task+App",
      techStack: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
      githubUrl: "#",
      liveDemoUrl: "#"
    },
    {
      title: "AI Learning Platform",
      description: "An educational platform leveraging AI to provide personalized learning experiences and adaptive content delivery.",
      imageUrl: "https://placehold.co/600x400/7E22CE/ffffff?text=AI+Learning",
      techStack: ["Python", "TensorFlow", "React", "FastAPI"],
      githubUrl: "#",
      liveDemoUrl: "#"
    }
  ];

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background - We'll add particles.js later */}
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-primary text-transparent bg-clip-text">
              Hi, I'm Brhina Wubet
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-text/80">
              Full-Stack Developer building creative & scalable solutions
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg transition-colors"
              >
                View Projects
              </button>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-primary hover:border-accent text-primary hover:text-accent px-6 py-3 rounded-lg transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
            <p className="text-center text-text/70 mb-12 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in full-stack development
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
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
              <div className="space-y-6">
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
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Get in Touch</h2>
            <p className="text-center text-text/70 mb-12">
              Have a question or want to work together?
            </p>
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-accent text-white font-medium py-3 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background text-text">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<ManageProjects />} />
              <Route path="manage" element={<ManageProjects />} />
              <Route path="new" element={<ProjectForm />} />
              <Route path="edit/:id" element={<ProjectForm />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );

};

export default App;
