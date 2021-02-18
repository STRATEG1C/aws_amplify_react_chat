import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  idToken: null,
  accessToken: null,
  refreshToken: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIdToken: (state, action ) => {
      state.idToken = action.payload;
    },
    setAccessToken: (state, action ) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const getIdToken = state => state.auth.idToken;
export const getAccessToken = state => state.auth.accessToken;
export const getRefreshToken = state => state.auth.refreshToken;
export const getCurrentUser = state => state.auth.currentUser;

export const { setIdToken, setAccessToken, setRefreshToken, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
