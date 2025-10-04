/**
 * Test Setup
 * Global test configuration and utilities
 */

import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

// Mock services
vi.mock('../services', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
    refreshToken: vi.fn(),
    getAuthToken: vi.fn(() => null),
    setAuthToken: vi.fn(),
    clearAuthToken: vi.fn(),
    isAuthenticated: vi.fn(() => false),
  },
  blogService: {
    getPosts: vi.fn(),
    getPostById: vi.fn(),
    createPost: vi.fn(),
    updatePost: vi.fn(),
    deletePost: vi.fn(),
    searchPosts: vi.fn(),
    getPostsByCategory: vi.fn(),
    getPostsByTag: vi.fn(),
  },
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    setAuthToken: vi.fn(),
    clearAuthToken: vi.fn(),
    getAuthToken: vi.fn(() => null),
  },
}));

// Setup MSW server
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});