import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import resumeReducer from '../features/resume/resumeSlice';
import authReducer from '../features/auth/authSlice';
import { resumeApi } from '../services/resumeApi';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    auth: authReducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resumeApi.middleware),
});

setupListeners(store.dispatch);

store.subscribe(() => {
  try {
    const auth = store.getState().auth;
    if (auth.authorized) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  } catch {
    // Ignore storage errors, such as disabled browser storage.
  }
});

export default store;
