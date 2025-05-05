// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

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

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            loggedIn ? (
              <AdminDashboard />
            ) : (
              <AdminLogin onLogin={() => setLoggedIn(true)} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
