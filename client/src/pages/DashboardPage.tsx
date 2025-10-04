/**
 * DashboardPage Component
 * User dashboard with overview and statistics
 */

import React from "react";
import { Card } from "../components/common";

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold text-gray-900">Total Posts</h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold text-gray-900">Total Views</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold text-gray-900">Likes</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to your dashboard!</h2>
          <p className="text-gray-600">
            This is where you will see your blog statistics, recent activity, and quick actions.
            Dashboard features will be implemented in the next phase.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardPage;
