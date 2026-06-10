import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Username atau password salah');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-nameFont1 text-primary mb-2 text-center">Admin CMS</h1>
          <p className="text-center text-gray-600 mb-8">Login untuk mengelola undangan</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Masukkan username"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Masukkan password"
                disabled={loading}
              />
            </div>

            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
            <p>Password: <code className="bg-white px-2 py-1 rounded">admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
