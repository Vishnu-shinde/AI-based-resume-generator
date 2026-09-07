import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  authorized: false,
  userEmail: null,
};

const getInitialState = () => {
  try {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? { ...defaultState, ...JSON.parse(storedAuth) } : defaultState;
  } catch {
    return defaultState;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setAuthorized: (state, action) => {
      state.authorized = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    logout: (state) => {
      state.authorized = false;
      state.userEmail = null;
    },
  },
});

export const { setAuthorized, setUserEmail, logout } = authSlice.actions;

export default authSlice.reducer;
