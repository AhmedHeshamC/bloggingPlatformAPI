/**
 * Redux Store Configuration
 * Implements proper state management with Redux Toolkit following SOLID principles
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slices
import authSlice from './slices/auth.slice';
import blogSlice from './slices/blog.slice';
import uiSlice from './slices/ui.slice';

// Configure store with proper middleware and dev tools
export const store = configureStore({
  reducer: {
    auth: authSlice,
    blog: blogSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checking
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these paths in the state for serialization checking
        ignoredPaths: ['register'],
      },
    }),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

// Export types for proper TypeScript usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks for components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;