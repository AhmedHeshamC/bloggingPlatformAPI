/**
 * NotFoundPage Component
 * 404 error page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <Card.Body className="space-y-6">
          <div>
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
          </div>

          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="space-y-4">
            <Link to="/">
              <Button variant="primary" className="w-full">
                Go Home
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFoundPage;
