/**
 * AuthService Mock
 * Mock implementation for testing
 */

export const authService = {
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
  refreshToken: vi.fn(),
  getAuthToken: vi.fn(() => null),
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
  isAuthenticated: vi.fn(() => false),
};