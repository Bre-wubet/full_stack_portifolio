import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/admin/Register';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ProjectForm from './pages/admin/ProjectForm';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import './App.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
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
