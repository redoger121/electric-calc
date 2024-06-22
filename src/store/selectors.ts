import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const statePrices = (state: RootState) => state.prices;
export const stateEstimates = (state: RootState) =>
  state.estimates.estimateOnCreation;
export const stateAllEstimates = (state: RootState) =>
  state.estimates.estimates;

export const itemInEstimate = createSelector(
  [statePrices, (state: RootState, id: string) => id],
  (prices, id) => {
   return prices.prices.find((el) => {
      return el.id === id;
    });
  }
);
