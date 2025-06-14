import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Attempting login with username:', username);
      const success = await login(username, password);
      if (success) {
        console.log('Login successful, navigating to dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('Login failed');
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 border-blue-300 rounded border-2 m-10'>
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 py-2 w-full flex flex-col bg-white p-6 rounded shadow-md">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-4 border p-2 w-full rounded"
          disabled={isLoading}
        />

        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-4 border p-2 w-full rounded"
          disabled={isLoading}
        />

        <button 
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
