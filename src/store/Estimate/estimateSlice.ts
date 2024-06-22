import { createSlice } from '@reduxjs/toolkit';
import { EstimateType, EstimateItem } from '../../types/estimate';
import { addEstimate } from './thunks/AddEstimate';
import { getEstimates } from './thunks/getEstimates';

type EstimateState = {
  estimateOnCreation: EstimateType;
  estimates: { [key: string]: EstimateType } | null;
  loading: boolean;
};

const initialState: EstimateState = {
  estimateOnCreation: {
    name: '',
    items: [],
    totalPrice: 0,
  },
  estimates: null,
  loading: false,
};

export const estimateSlice = createSlice({
  name: 'estimate',
  initialState,
  reducers: {
    addNameToEstimateOnCreation: (
      state,
      { payload: title }: { payload: string }
    ) => {
      state.estimateOnCreation.name = title;
    },

    addItemToEstimateOnCreation: (
      state,
      {
        payload: { estimateItem, cost },
      }: { payload: { estimateItem: EstimateItem; cost: number } }
    ) => {
      const itemExist: EstimateItem | undefined =
        state.estimateOnCreation.items.find((item) => {
          return item.id === estimateItem.id;
        });
      if (itemExist) {
        state.estimateOnCreation.items.forEach((el) => {
          if (el.id === itemExist.id) {
            el.count = itemExist.count + estimateItem.count;
          }
        });
        state.estimateOnCreation.totalPrice += estimateItem.count * cost;
      } else {
        state.estimateOnCreation.items = [
          estimateItem,
          ...state.estimateOnCreation.items,
        ];
        state.estimateOnCreation.totalPrice += estimateItem.count * cost;
      }
    },
    clearEstimateOnCreation: (state) => {
      state.estimateOnCreation = initialState.estimateOnCreation;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEstimate.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addEstimate.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addEstimate.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getEstimates.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getEstimates.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getEstimates.fulfilled, (state, action) => {
      state.estimates = action.payload;
      state.loading = false;
    });
  },
});

export default estimateSlice.reducer;
export const { addItemToEstimateOnCreation, addNameToEstimateOnCreation,clearEstimateOnCreation } =
  estimateSlice.actions;
