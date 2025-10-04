/**
 * ProfilePage Component
 * User profile management page
 */

import React from "react";
import { Card } from "../components/common";

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Profile</h2>
          <p className="text-gray-600 mb-4">
            Manage your profile information, avatar, and account settings.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">Coming Soon: Profile Editing, Avatar Upload, Settings</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
