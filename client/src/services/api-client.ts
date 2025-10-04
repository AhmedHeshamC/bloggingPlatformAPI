/**
 * Base API Client with proper error handling and interceptors
 * Following SOLID principles - Single Responsibility for HTTP communication
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiErrorResponse } from '../types';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Custom Error Class for better error handling
export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// API Client Class
class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(API_CONFIG);
    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors for consistent behavior
   */
  private setupInterceptors(): void {
    // Request Interceptor - Add auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor - Handle errors consistently
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response) {
          const { status, data } = error.response;
          const message = data?.message || 'An unexpected error occurred';

          // Handle specific error cases
          if (status === 401) {
            // Clear expired token
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }

          throw new ApiError(message, status, data);
        } else if (error.request) {
          throw new ApiError('Network error - please check your connection', 0);
        } else {
          throw new ApiError('Request setup error', 0);
        }
      }
    );
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  /**
   * Get current authentication token
   */
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for external usage
export type { AxiosRequestConfig, AxiosResponse };