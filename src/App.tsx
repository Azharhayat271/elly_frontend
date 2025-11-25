import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import CalculationTree from './components/CalculationTree';
import Auth from './components/Auth';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border px-6 py-4 flex justify-between items-center shadow-sm">
      <Link to="/" className="text-xl font-bold text-primary hover:text-primary/90">
        Discussions
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {isAuthenticated ? (
          <>
            <span className="text-secondary">Welcome, <span className="font-semibold text-primary">{user?.username}</span></span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-full text-primary font-semibold hover:bg-hover transition-colors text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login"
            className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors text-sm shadow-sm"
          >
            Login / Register
          </Link>
        )}
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<CalculationTree />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
