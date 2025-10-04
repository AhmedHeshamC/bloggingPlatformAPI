/**
 * Layout Component
 * Main application layout with header and navigation
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { logoutUser } from '../../store/slices/auth.slice';
import { Button } from '../common';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
    ${isActive
      ? 'bg-primary-900 text-white'
      : 'text-gray-300 hover:bg-primary-700 hover:text-white'
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-primary-800 shadow">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <NavLink
                to="/"
                className="flex items-center space-x-2 text-white text-xl font-bold"
              >
                <span>BlogPlatform</span>
              </NavLink>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-4">
              <NavLink to="/" className={navLinkClasses}>
                Home
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/dashboard" className={navLinkClasses}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/posts/create" className={navLinkClasses}>
                    Create Post
                  </NavLink>
                  <NavLink to="/my-posts" className={navLinkClasses}>
                    My Posts
                  </NavLink>
                  <NavLink to="/profile" className={navLinkClasses}>
                    Profile
                  </NavLink>
                </>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 text-sm">
                    Welcome, {user?.name}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white hover:bg-primary-700"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClasses}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={navLinkClasses}>
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile menu button (for future implementation) */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-300 hover:text-white p-2"
                aria-label="Toggle mobile menu"
              >
                {/* Mobile menu icon would go here */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 Blog Platform. Built with React & TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;