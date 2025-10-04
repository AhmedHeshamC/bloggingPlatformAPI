/**
 * RegisterPage Component
 * User registration page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <Card.Body className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Join our community and start sharing your stories
            </p>
          </div>

          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">Registration form will be implemented here</p>
            <p className="text-sm text-gray-500">
              Features: Name/Email/Password validation, email uniqueness, error handling
            </p>
          </div>

          <div className="text-center space-y-4">
            <Button variant="primary" className="w-full" disabled>
              Create Account (Coming Soon)
            </Button>

            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;