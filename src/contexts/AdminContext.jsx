import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        console.error('Error parsing stored admin:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Simple auth: hardcoded admin credentials for now
    // In production, validate against backend
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username, loginTime: new Date().toISOString() };
      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
