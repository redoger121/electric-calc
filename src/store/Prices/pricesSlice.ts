import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Prices } from '../../types/price';
import { ErrorPayload } from '../../types/errorPayload';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import { addPrice } from '../thunks/AddDeletePriceItem';
import { editPrice } from '../thunks/EditPriceItem';

export const getAllPrices = createAsyncThunk<
  Prices,
  undefined,
  { rejectValue: ErrorPayload }
>('getAllPtices', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/prices.json`);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage: 'Failed to fetch prices data',
    });
  }
});

type PriceState = {
  prices: Prices;
  loading: boolean;
  priceErroros: string;
};

const initialState: PriceState = {
  prices: [],
  loading: false,
  priceErroros: '',
};

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPrices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPrices.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        state.prices = [];
        state.loading = false;
        return;
      }
      state.loading = false;
      state.prices = action.payload;
    });

    builder.addCase(getAllPrices.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addPrice.rejected, (state, action) => {
      if (action.payload) {
        state.priceErroros = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(addPrice.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addPrice.fulfilled, (state, action) => {
      state.prices = action.payload;
      state.loading = false;
    });

    builder.addCase(editPrice.rejected, (state, action) => {
      if (action.payload) {
        state.priceErroros = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(editPrice.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(editPrice.fulfilled, (state, action) => {
      state.prices = state.prices.map((el) => {
        if (el.id === action.payload.id) {
          el.price = action.payload.price;
          el.title = action.payload.title;
          return el;
        }
        return el;
      });
      state.loading = false;
    });
  },
});
export default pricesSlice.reducer;
// export const {  } = pricesSlice.actions;
