import { configureStore } from '@reduxjs/toolkit';
import pricesSlice from './Prices/pricesSlice';
import estimateSlice from './Estimate/estimateSlice';

export const store = configureStore({
  reducer: {
    prices: pricesSlice,
    estimates: estimateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default AppDispatch;
