import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from 'store/currency';
import cartReducer from 'store/cart';
import { loadState } from 'helpers/local-storage';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
  preloadedState: loadState(),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
