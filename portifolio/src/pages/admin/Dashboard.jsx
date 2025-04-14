import { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/dashboard/new', icon: '📁', label: 'Add Project' },
    { path: '/admin/dashboard/manage', icon: '🗂️', label: 'Manage Projects' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-200 text-text transition-all duration-300 ease-in-out`}
      >
        <div className="h-20 flex items-center justify-between px-4">
          <h1 className={`${!isSidebarOpen && 'hidden'} font-bold text-xl`}>Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-900 hover:hover:bg-gray-300 hover:text-primary transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`${!isSidebarOpen && 'hidden'} ml-3`}>{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-gray-900 hover:bg-gray-300 hover:text-primary transition-colors"
              >
                <span className="text-xl">🔐</span>
                <span className={`${!isSidebarOpen && 'hidden'} ml-3`}>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;