/**
 * LoginPage Component
 * User authentication page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <Card.Body className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-gray-600">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">Login form will be implemented here</p>
            <p className="text-sm text-gray-500">
              Features: Email/Password validation, JWT authentication, error handling
            </p>
          </div>

          <div className="text-center space-y-4">
            <Button variant="primary" className="w-full" disabled>
              Sign In (Coming Soon)
            </Button>

            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;