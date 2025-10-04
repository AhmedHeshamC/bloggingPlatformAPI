/**
 * CreatePostPage Component
 * Page for creating new blog posts
 */

import React from "react";
import { Card } from "../components/common";

const CreatePostPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>

      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Post Editor</h2>
          <p className="text-gray-600 mb-4">
            Rich text editor and post creation form will be implemented here.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">Coming Soon: Rich Text Editor, Form Validation, Auto-save</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreatePostPage;
