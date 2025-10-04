/**
 * MyPostsPage Component
 * Page for managing user's blog posts
 */

import React from 'react';
import { Card } from '../components/common';

const MyPostsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
      </div>

      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Post Management</h2>
          <p className="text-gray-600 mb-4">
            Manage your blog posts - create, edit, delete, and view analytics.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">Coming Soon: CRUD Operations, Search, Analytics</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyPostsPage;
