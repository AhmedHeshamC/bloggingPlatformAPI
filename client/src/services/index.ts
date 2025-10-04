/**
 * Services barrel export
 * Centralizes all service exports for clean imports
 */

export { apiClient, ApiError } from './api-client';
export { authService, IAuthService } from './auth.service';
export { blogService, IBlogService } from './blog.service';

// Export all types from services
export type { AxiosRequestConfig, AxiosResponse } from './api-client';