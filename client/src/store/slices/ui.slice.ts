/**
 * UI Slice
 * Manages UI state for better user experience
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  // Sidebar state
  sidebarOpen: boolean;

  // Loading states for specific components
  loading: {
    global: boolean;
    posts: boolean;
    auth: boolean;
  };

  // Notification state
  notifications: {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
  }[];

  // Modal states
  modals: {
    createPost: boolean;
    editPost: boolean;
    deletePost: boolean;
    confirm: boolean;
  };

  // Theme
  theme: 'light' | 'dark' | 'system';

  // Search state
  searchQuery: string;
  searchActive: boolean;

  // Form states
  forms: {
    postForm: {
      isDirty: boolean;
      isValid: boolean;
    };
  };
}

const initialState: UIState = {
  sidebarOpen: false,
  loading: {
    global: false,
    posts: false,
    auth: false,
  },
  notifications: [],
  modals: {
    createPost: false,
    editPost: false,
    deletePost: false,
    confirm: false,
  },
  theme: 'system',
  searchQuery: '',
  searchActive: false,
  forms: {
    postForm: {
      isDirty: false,
      isValid: false,
    },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    // Loading actions
    setLoading: (state, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },

    // Notification actions
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      const notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Modal actions
    openModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key as keyof UIState['modals']] = false;
      });
    },

    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },

    // Search actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchActive: (state, action: PayloadAction<boolean>) => {
      state.searchActive = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.searchActive = false;
    },

    // Form actions
    setFormState: (state, action: PayloadAction<{
      form: keyof UIState['forms'];
      isDirty?: boolean;
      isValid?: boolean;
    }>) => {
      const { form, isDirty, isValid } = action.payload;
      if (isDirty !== undefined) {
        state.forms[form].isDirty = isDirty;
      }
      if (isValid !== undefined) {
        state.forms[form].isValid = isValid;
      }
    },
    resetFormState: (state, action: PayloadAction<keyof UIState['forms']>) => {
      state.forms[action.payload] = { isDirty: false, isValid: false };
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  setGlobalLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setTheme,
  setSearchQuery,
  setSearchActive,
  clearSearch,
  setFormState,
  resetFormState,
} = uiSlice.actions;

// Selectors
export const selectUI = (state: { ui: UIState }) => state.ui;
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen;
export const selectLoading = (state: { ui: UIState }) => state.ui.loading;
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;
export const selectModals = (state: { ui: UIState }) => state.ui.modals;
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectSearchQuery = (state: { ui: UIState }) => state.ui.searchQuery;
export const selectSearchActive = (state: { ui: UIState }) => state.ui.searchActive;

// Export reducer
export default uiSlice.reducer;