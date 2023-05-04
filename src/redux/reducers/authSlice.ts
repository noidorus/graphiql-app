import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { auth } from '@/services/firebase';
import type { AppDispatch } from '../setupStore';

interface AuthState {
  user: null;
}

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
      return {
        ...state,
        ...action.payload,
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
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  });
};
