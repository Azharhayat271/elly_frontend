import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import CalculationTree from './components/CalculationTree';
import Auth from './components/Auth';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Services' },
  { to: '/discussions', label: 'Discussions' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `font-medium transition-colors ${
    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
  }`;

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-primary hover:text-primary/90">
            Discussions
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-secondary">Welcome, <span className="font-semibold text-primary">{user?.username}</span></span>
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

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden p-2 -mr-2 text-primary"
          >
            <span className="block w-6 space-y-1.5">
              <span className="block h-0.5 bg-primary rounded" />
              <span className="block h-0.5 bg-primary rounded" />
              <span className="block h-0.5 bg-primary rounded" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4 text-sm bg-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/discussions" element={<CalculationTree />} />
              <Route path="/login" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
