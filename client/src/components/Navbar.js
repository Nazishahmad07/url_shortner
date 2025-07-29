import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, BarChart3, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center h-16 min-h-[4rem]">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-800">URL Shortener</span>
          </Link>

          {/* Hamburger button for mobile */}
          <button
            className="md:hidden flex items-center px-2 py-1 border rounded text-gray-600 border-gray-400 hover:text-primary-600 hover:border-primary-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Settings size={20} />
                  <span>Profile</span>
                </Link>
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-primary-600" />
                  </div>
                  <span className="text-gray-700 truncate max-w-[100px] md:max-w-[150px]" title={user?.username}>{user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-lg shadow-lg py-2 px-4 space-y-2 z-50">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Profile</span>
                </Link>
                <div className="flex items-center space-x-2 min-w-0 py-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-primary-600" />
                  </div>
                  <span className="text-gray-700 truncate max-w-[100px]" title={user?.username}>{user?.username}</span>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block btn-primary w-full text-center py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 