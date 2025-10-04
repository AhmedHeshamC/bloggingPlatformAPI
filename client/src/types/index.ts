/**
 * Core type definitions for the Blogging Platform
 * Following strict typing for type safety and better development experience
 */

// Domain Entity Types
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: number;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

// API Request/Response Types
export interface ApiErrorResponse {
  message: string;
  error?: string;
  stack?: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Blog Post Types
export interface CreatePostRequest {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: number;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

// Navigation Types
export type RoutePath = '/' | '/login' | '/register' | '/dashboard' | '/posts/create' | '/posts/:id' | '/posts/edit/:id' | '/profile' | '/my-posts';

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};