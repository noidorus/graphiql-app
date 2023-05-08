import { User } from 'firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { auth } from '@/services/firebase';
import type { AppDispatch } from '../setupStore';

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(state);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;

export const listenToAuthChanges = () => (dispatch: AppDispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('auth', JSON.stringify({ user }));
      dispatch(setUser(user));
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
      }

      dispatch(setUser(null));
    }
  });
};
