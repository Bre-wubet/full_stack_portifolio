const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-700 to-gray-500 text-white py-8">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@example.com" className="hover:text-blue-400 transition-colors">
                  <i className="far fa-envelope mr-2"></i>brwubet@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  <i className="fas fa-phone mr-2"></i>+251 979 5354 92
                </a>
              </li>
              <li>
                <p>
                  <i className="fas fa-map-marker-alt mr-2"></i>Mekelle-university, ON, Ethiopia
                </p>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-blue-400 transition-colors">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-blue-400 transition-colors">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-blue-400 transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-white hover:text-blue-400 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Brhina Wubet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;