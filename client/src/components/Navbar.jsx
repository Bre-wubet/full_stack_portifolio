import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-gradient-to-br from-blue-200 via-gray-300 to-gray-50 backdrop-blur-sm shadow-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary cursor-pointer" onClick={() => scrollToSection('hero')}>Brie</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#projects" className="text-pink-600 hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#about" className="text-pink-600 hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-pink-600 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-pink-600 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm">
          <a
            href="#projects"
            className="block w-full text-left px-3 py-2 text-text hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#about"
            className="block w-full text-left px-3 py-2 text-text hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="block w-full text-left px-3 py-2 text-text hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;