import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer, { getAccessToken, getCurrentUser, getIdToken, getRefreshToken } from './auth/authSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
  preloadedState: {
    auth: JSON.parse(localStorage.getItem('auth')) || {}
  }
});

const saveNecessaryDataToLocalStorage = state => {
  const savedData = {
    idToken: getIdToken(store.getState()),
    accessToken: getAccessToken(store.getState()),
    refreshToken: getRefreshToken(store.getState()),
    currentUser: getCurrentUser(store.getState()),
  };

  localStorage.setItem('auth', JSON.stringify(savedData));
}

/* State caching */
store.subscribe(saveNecessaryDataToLocalStorage);

export default store;
