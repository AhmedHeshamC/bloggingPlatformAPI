/**
 * Main App Component
 * Implements routing, global state management, and authentication
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store';
import { authService } from './services';
import { getCurrentUser } from './store/slices/auth.slice';

// Import components
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import ProfilePage from './pages/ProfilePage';
import MyPostsPage from './pages/MyPostsPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App Content Component
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, token } = useAppSelector(state => state.auth);

  // Initialize app and check authentication
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = authService.getAuthToken();

      if (storedToken && !isAuthenticated) {
        try {
          // Validate token by fetching current user
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          // Token is invalid, clear it
          authService.clearAuthToken();
        }
      }
    };

    initializeAuth();
  }, [dispatch, isAuthenticated]);

  if (isLoading && token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/create"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPostsPage />
              </ProtectedRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
