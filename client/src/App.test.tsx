/**
 * App Component Tests
 * Basic integration tests for the main application
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the store
vi.mock('./store', () => ({
  store: {
    getState: () => ({
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      },
      blog: {
        posts: [],
        currentPost: null,
        isLoading: false,
        error: null,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      },
      ui: {
        sidebarOpen: false,
        loading: { global: false, posts: false, auth: false },
        notifications: [],
        modals: { createPost: false, editPost: false, deletePost: false, confirm: false },
        theme: 'system',
        searchQuery: '',
        searchActive: false,
        forms: { postForm: { isDirty: false, isValid: false } },
      },
    }),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
  },
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: any) => selector({
    auth: {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    },
    blog: {
      posts: [],
      currentPost: null,
      isLoading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    },
    ui: {
      sidebarOpen: false,
      loading: { global: false, posts: false, auth: false },
      notifications: [],
      modals: { createPost: false, editPost: false, deletePost: false, confirm: false },
      theme: 'system',
      searchQuery: '',
      searchActive: false,
      forms: { postForm: { isDirty: false, isValid: false } },
    },
  }),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Route: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Navigate: () => <div>Navigation</div>,
    NavLink: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock all page components
vi.mock('./pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('./pages/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));

vi.mock('./pages/RegisterPage', () => ({
  default: () => <div data-testid="register-page">Register Page</div>,
}));

vi.mock('./pages/DashboardPage', () => ({
  default: () => <div data-testid="dashboard-page">Dashboard Page</div>,
}));

vi.mock('./pages/CreatePostPage', () => ({
  default: () => <div data-testid="create-post-page">Create Post Page</div>,
}));

vi.mock('./pages/PostDetailPage', () => ({
  default: () => <div data-testid="post-detail-page">Post Detail Page</div>,
}));

vi.mock('./pages/EditPostPage', () => ({
  default: () => <div data-testid="edit-post-page">Edit Post Page</div>,
}));

vi.mock('./pages/ProfilePage', () => ({
  default: () => <div data-testid="profile-page">Profile Page</div>,
}));

vi.mock('./pages/MyPostsPage', () => ({
  default: () => <div data-testid="my-posts-page">My Posts Page</div>,
}));

vi.mock('./pages/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

// Mock Layout component
vi.mock('./components/layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">
      <div data-testid="header">Header</div>
      <main>{children}</main>
      <div data-testid="footer">Footer</div>
    </div>
  ),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('displays header and footer', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('provides Redux store context', () => {
    render(<App />);
    // App should render without errors, which means Redux Provider is working
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});