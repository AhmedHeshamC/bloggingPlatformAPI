/**
 * HomePage Component
 * Landing page displaying blog posts
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchPosts } from '../store/slices/blog.slice';
import { Card, LoadingSpinner, Button } from '../components/common';
import { Post } from '../types';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error } = useAppSelector(state => state.blog);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Posts</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => dispatch(fetchPosts({ page: 1, limit: 10 }))}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Blog Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing stories and share your own with the community
        </p>

        {isAuthenticated && (
          <div className="flex justify-center space-x-4">
            <Link to="/posts/create">
              <Button variant="primary">Create New Post</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary">Dashboard</Button>
            </Link>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Blog Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>

        {posts.length === 0 && !isLoading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share a story with the community!
            </p>
            {isAuthenticated && (
              <Link to="/posts/create">
                <Button variant="primary">Create First Post</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200">
                <Card.Body>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-600 font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    <Link
                      to={`/posts/${post.id}`}
                      className="hover:text-primary-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateContent(post.content)}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 text-sm font-medium">
                          {post.author?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {post.author?.name || 'Anonymous'}
                      </span>
                    </div>

                    <Link to={`/posts/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button (for future pagination) */}
      {posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="secondary" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Load More Posts'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;