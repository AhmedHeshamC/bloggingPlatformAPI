/**
 * Authentication Service
 * Handles all authentication-related API calls following the Repository pattern
 */

import { apiClient, ApiError } from './api-client';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

/**
 * Interface for authentication service
 * Following Dependency Inversion Principle
 */
export interface IAuthService {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  register(userData: RegisterRequest): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  refreshToken(): Promise<AuthResponse>;
}

/**
 * Implementation of authentication service
 */
class AuthService implements IAuthService {
  private readonly endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    current: '/auth/me',
    refresh: '/auth/refresh',
  };

  /**
   * Authenticate user with email and password
   * @param credentials - User login credentials
   * @returns Promise resolving to auth response with user and token
   * @throws ApiError on authentication failure
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(this.endpoints.login, credentials);

      // Store token for subsequent requests
      apiClient.setAuthToken(response.token);

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Invalid email or password', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Register a new user account
   * @param userData - User registration data
   * @returns Promise resolving to auth response with user and token
   * @throws ApiError on registration failure
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(this.endpoints.register, userData);

      // Store token for subsequent requests
      apiClient.setAuthToken(response.token);

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        // Handle specific registration errors
        if (error.status === 409) {
          throw new ApiError('Email already exists', error.status, error.data);
        }
        throw new ApiError('Registration failed', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Logout user and clear authentication data
   * @returns Promise resolving when logout is complete
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue with local logout even if server call fails
      console.warn('Server logout failed:', error);
    } finally {
      // Always clear local token
      apiClient.clearAuthToken();
    }
  }

  /**
   * Get current authenticated user information
   * @returns Promise resolving to user data
   * @throws ApiError if user is not authenticated
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>(this.endpoints.current);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Unable to fetch user information', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Refresh authentication token
   * @returns Promise resolving to new auth response
   * @throws ApiError if token refresh fails
   */
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(this.endpoints.refresh);

      // Update stored token
      apiClient.setAuthToken(response.token);

      return response;
    } catch (error) {
      // Clear invalid token
      apiClient.clearAuthToken();

      if (error instanceof ApiError) {
        throw new ApiError('Session expired, please login again', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Check if user is currently authenticated
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    return !!apiClient.getAuthToken();
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export interface for dependency injection
export { IAuthService };