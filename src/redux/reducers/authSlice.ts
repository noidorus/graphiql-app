import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { auth } from '@/services/firebase';
import type { AppDispatch } from '../setupStore';

interface AuthState {
  userId: null | string;
}

const initialState: AuthState = {
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
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
      localStorage.setItem('auth', JSON.stringify({ uid: user.uid }));
      dispatch(setUser(user.uid));
    } else {
      localStorage.removeItem('auth');
      dispatch(setUser(null));
    }
  });
};
