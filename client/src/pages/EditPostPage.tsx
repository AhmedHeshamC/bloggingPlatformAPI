/**
 * EditPostPage Component
 * Page for editing existing blog posts
 */

import React from "react";
import { Card } from "../components/common";

const EditPostPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>

      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Post Editor</h2>
          <p className="text-gray-600 mb-4">
            Edit existing blog posts with pre-populated form data.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">Coming Soon: Post Editing, Version History, Auto-save</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditPostPage;
