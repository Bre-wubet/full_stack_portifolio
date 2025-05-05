
import { useState } from 'react';
import API from '../api';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      onLogin(); // callback to show dashboard
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 py-2">
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="block mb-2 border p-2 w-full rounded" />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block mb-2 border p-2 w-full rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">Login</button>
    </form>
  );
}
