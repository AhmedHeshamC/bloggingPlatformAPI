/**
 * Blog Service
 * Handles all blog-related API calls following the Repository pattern
 */

import { apiClient, ApiError } from './api-client';
import { Post, CreatePostRequest, UpdatePostRequest, PaginatedResponse } from '../types';

/**
 * Interface for blog service
 * Following Dependency Inversion Principle
 */
export interface IBlogService {
  getPosts(page?: number, limit?: number, searchTerm?: string): Promise<PaginatedResponse<Post>>;
  getPostById(id: number): Promise<Post>;
  createPost(postData: CreatePostRequest): Promise<Post>;
  updatePost(id: number, postData: UpdatePostRequest): Promise<Post>;
  deletePost(id: number): Promise<void>;
  searchPosts(term: string, page?: number, limit?: number): Promise<PaginatedResponse<Post>>;
  getPostsByCategory(category: string, page?: number, limit?: number): Promise<PaginatedResponse<Post>>;
  getPostsByTag(tag: string, page?: number, limit?: number): Promise<PaginatedResponse<Post>>;
}

/**
 * Implementation of blog service
 */
class BlogService implements IBlogService {
  private readonly endpoints = {
    posts: '/posts',
    post: (id: number) => `/posts/${id}`,
    search: '/posts/search',
    category: (category: string) => `/posts/category/${category}`,
    tag: (tag: string) => `/posts/tag/${tag}`,
  };

  /**
   * Fetch paginated blog posts
   * @param page - Page number (default: 1)
   * @param limit - Number of posts per page (default: 10)
   * @param searchTerm - Optional search term
   * @returns Promise resolving to paginated posts
   */
  async getPosts(
    page: number = 1,
    limit: number = 10,
    searchTerm?: string
  ): Promise<PaginatedResponse<Post>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (searchTerm) {
        params.append('term', searchTerm);
      }

      const response = await apiClient.get<PaginatedResponse<Post>>(
        `${this.endpoints.posts}?${params.toString()}`
      );

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Failed to fetch posts', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Fetch a single blog post by ID
   * @param id - Post ID
   * @returns Promise resolving to post data
   * @throws ApiError if post not found
   */
  async getPostById(id: number): Promise<Post> {
    try {
      const response = await apiClient.get<Post>(this.endpoints.post(id));
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new ApiError('Post not found', error.status, error.data);
        }
        throw new ApiError('Failed to fetch post', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Create a new blog post
   * @param postData - Post creation data
   * @returns Promise resolving to created post
   * @throws ApiError on validation failure
   */
  async createPost(postData: CreatePostRequest): Promise<Post> {
    try {
      // Validate required fields
      this.validatePostData(postData);

      const response = await apiClient.post<Post>(this.endpoints.posts, postData);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Failed to create post', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Update an existing blog post
   * @param id - Post ID
   * @param postData - Post update data
   * @returns Promise resolving to updated post
   * @throws ApiError if post not found or validation fails
   */
  async updatePost(id: number, postData: UpdatePostRequest): Promise<Post> {
    try {
      // Validate update data
      this.validatePostData(postData, true);

      const response = await apiClient.put<Post>(this.endpoints.post(id), postData);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new ApiError('Post not found', error.status, error.data);
        }
        throw new ApiError('Failed to update post', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Delete a blog post
   * @param id - Post ID
   * @returns Promise resolving when post is deleted
   * @throws ApiError if post not found or user lacks permission
   */
  async deletePost(id: number): Promise<void> {
    try {
      await apiClient.delete<void>(this.endpoints.post(id));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new ApiError('Post not found', error.status, error.data);
        }
        if (error.status === 403) {
          throw new ApiError('Permission denied', error.status, error.data);
        }
        throw new ApiError('Failed to delete post', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Search blog posts by term
   * @param term - Search term
   * @param page - Page number (default: 1)
   * @param limit - Number of posts per page (default: 10)
   * @returns Promise resolving to search results
   */
  async searchPosts(
    term: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Post>> {
    try {
      const params = new URLSearchParams({
        q: term,
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await apiClient.get<PaginatedResponse<Post>>(
        `${this.endpoints.search}?${params.toString()}`
      );

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Search failed', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Get posts by category
   * @param category - Category name
   * @param page - Page number (default: 1)
   * @param limit - Number of posts per page (default: 10)
   * @returns Promise resolving to posts in category
   */
  async getPostsByCategory(
    category: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Post>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await apiClient.get<PaginatedResponse<Post>>(
        `${this.endpoints.category(category)}?${params.toString()}`
      );

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Failed to fetch posts by category', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Get posts by tag
   * @param tag - Tag name
   * @param page - Page number (default: 1)
   * @param limit - Number of posts per page (default: 10)
   * @returns Promise resolving to posts with tag
   */
  async getPostsByTag(
    tag: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Post>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await apiClient.get<PaginatedResponse<Post>>(
        `${this.endpoints.tag(tag)}?${params.toString()}`
      );

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError('Failed to fetch posts by tag', error.status, error.data);
      }
      throw error;
    }
  }

  /**
   * Validate post data
   * @private
   * @param postData - Post data to validate
   * @param isUpdate - Whether this is an update operation
   * @throws Error if validation fails
   */
  private validatePostData(
    postData: CreatePostRequest | UpdatePostRequest,
    isUpdate: boolean = false
  ): void {
    if (!isUpdate) {
      // Required fields for creation
      if (!postData.title?.trim()) {
        throw new Error('Title is required');
      }
      if (!postData.content?.trim()) {
        throw new Error('Content is required');
      }
      if (!postData.category?.trim()) {
        throw new Error('Category is required');
      }
    }

    // Field validation
    if (postData.title && postData.title.length > 200) {
      throw new Error('Title must be less than 200 characters');
    }
    if (postData.content && postData.content.length > 50000) {
      throw new Error('Content must be less than 50,000 characters');
    }
    if (postData.category && postData.category.length > 50) {
      throw new Error('Category must be less than 50 characters');
    }
    if (postData.tags && postData.tags.length > 10) {
      throw new Error('Maximum 10 tags allowed');
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();

// Export interface for dependency injection
export { IBlogService };