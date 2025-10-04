/**
 * MSW Server Configuration
 * Mock Service Worker setup for API mocking in tests
 */

import { setupServer } from 'msw/node';
import { http } from 'msw';

// Mock API handlers
export const handlers = [
  // Auth endpoints
  http.post('/api/v1/auth/login', () => {
    return Response.json({
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      token: 'mock-jwt-token',
    });
  }),

  http.post('/api/v1/auth/register', () => {
    return Response.json({
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      token: 'mock-jwt-token',
    }, { status: 201 });
  }),

  http.get('/api/v1/auth/me', () => {
    return Response.json({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    });
  }),

  http.post('/api/v1/auth/logout', () => {
    return Response.json({ message: 'Logged out successfully' });
  }),

  // Blog posts endpoints
  http.get('/api/v1/posts', () => {
    return Response.json({
      data: [
        {
          id: 1,
          title: 'Sample Blog Post',
          content: 'This is a sample blog post content for testing purposes.',
          category: 'Technology',
          tags: ['React', 'TypeScript', 'Testing'],
          authorId: 1,
          author: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z',
          },
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    });
  }),

  http.get('/api/v1/posts/:id', ({ params }) => {
    const { id } = params;
    return Response.json({
      id: Number(id),
      title: 'Sample Blog Post',
      content: 'This is a sample blog post content for testing purposes.',
      category: 'Technology',
      tags: ['React', 'TypeScript', 'Testing'],
      authorId: 1,
      author: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    });
  }),

  http.post('/api/v1/posts', () => {
    return Response.json({
      id: 2,
      title: 'New Blog Post',
      content: 'This is a new blog post created for testing.',
      category: 'Technology',
      tags: ['React', 'Testing'],
      authorId: 1,
      author: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    }, { status: 201 });
  }),

  http.put('/api/v1/posts/:id', ({ params }) => {
    const { id } = params;
    return Response.json({
      id: Number(id),
      title: 'Updated Blog Post',
      content: 'This blog post has been updated for testing.',
      category: 'Technology',
      tags: ['React', 'Testing', 'Updated'],
      authorId: 1,
      author: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    });
  }),

  http.delete('/api/v1/posts/:id', () => {
    return new Response(null, { status: 204 });
  }),
];

// Create MSW server
export const server = setupServer(...handlers);