/**
 * Blog Slice
 * Manages blog posts state following Redux Toolkit best practices
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { blogService, IBlogService } from '../../services';
import { PostState, Post, CreatePostRequest, UpdatePostRequest, PaginatedResponse } from '../../types';

// Initial state
const initialState: PostState = {
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
};

// Async thunks for blog operations
export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (params: { page?: number; limit?: number; searchTerm?: string }, { rejectWithValue }) => {
    try {
      const response = await blogService.getPosts(params.page, params.limit, params.searchTerm);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'blog/fetchPostById',
  async (id: number, { rejectWithValue }) => {
    try {
      const post = await blogService.getPostById(id);
      return post;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (postData: CreatePostRequest, { rejectWithValue }) => {
    try {
      const post = await blogService.createPost(postData);
      return post;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async (params: { id: number; postData: UpdatePostRequest }, { rejectWithValue }) => {
    try {
      const post = await blogService.updatePost(params.id, params.postData);
      return post;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      await blogService.deletePost(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete post');
    }
  }
);

export const searchPosts = createAsyncThunk(
  'blog/searchPosts',
  async (params: { term: string; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await blogService.searchPosts(params.term, params.page, params.limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Search failed');
    }
  }
);

export const fetchPostsByCategory = createAsyncThunk(
  'blog/fetchPostsByCategory',
  async (params: { category: string; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await blogService.getPostsByCategory(params.category, params.page, params.limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts by category');
    }
  }
);

// Blog slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Clear any blog-related errors
    clearBlogError: (state) => {
      state.error = null;
    },

    // Clear current post
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },

    // Update post in posts array (for real-time updates)
    updatePostInArray: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

    // Remove post from posts array
    removePostFromArray: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },

    // Set pagination
    setPagination: (state, action: PayloadAction<Partial<PostState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    // Reset blog state
    resetBlogState: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PaginatedResponse<Post>>) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch post by ID
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update post
    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete post
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Search posts
    builder
      .addCase(searchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action: PayloadAction<PaginatedResponse<Post>>) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch posts by category
    builder
      .addCase(fetchPostsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByCategory.fulfilled, (state, action: PayloadAction<PaginatedResponse<Post>>) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchPostsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearBlogError,
  clearCurrentPost,
  updatePostInArray,
  removePostFromArray,
  setPagination,
  resetBlogState,
} = blogSlice.actions;

// Selectors
export const selectBlog = (state: { blog: PostState }) => state.blog;
export const selectPosts = (state: { blog: PostState }) => state.blog.posts;
export const selectCurrentPost = (state: { blog: PostState }) => state.blog.currentPost;
export const selectBlogLoading = (state: { blog: PostState }) => state.blog.isLoading;
export const selectBlogError = (state: { blog: PostState }) => state.blog.error;
export const selectPagination = (state: { blog: PostState }) => state.blog.pagination;

// Export reducer
export default blogSlice.reducer;