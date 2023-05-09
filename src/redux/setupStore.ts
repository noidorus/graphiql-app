// import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';

// import auth, { listenToAuthChanges, AuthState } from './reducers/authSlice';

// const rootReducer = combineReducers({
//   auth,
// });

// // const getPreloadState = () => {
// //   let initState: AuthState;
// //   if (typeof window !== 'undefined') {
// //     const data = localStorage.getItem('auth') || JSON.stringify({ user: null });
// //     initState = JSON.parse(data) as AuthState;
// //   } else {
// //     initState = { user: null };
// //   }

// //   return initState;
// // };

// const setupStore = () => {
//   // const authState = getPreloadState();

//   const store = configureStore({
//     reducer: rootReducer,
//     // preloadedState: {
//     //   auth: authState,
//     // },
//     devTools: process.env.NODE_ENV !== 'production',
//   });

//   store.dispatch(listenToAuthChanges());
//   return store;
// };

// export type AppStore = ReturnType<typeof setupStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export const wrapper = createWrapper<AppStore>(setupStore);
