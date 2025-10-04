/**
 * PostDetailPage Component
 * Page for viewing a single blog post
 */

import React from "react";
import { Card } from "../components/common";

const PostDetailPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <Card.Body className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Detail View</h2>
          <p className="text-gray-600">
            Individual blog posts will be displayed here with full content, comments, and interactions.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostDetailPage;
