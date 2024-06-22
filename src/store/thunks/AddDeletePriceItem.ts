import { createAsyncThunk } from '@reduxjs/toolkit';
import { Prices } from '../../types/price';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';

export const addPrice = createAsyncThunk<
  Prices,
  Prices,
  { rejectValue: string }
>('addPrice', async (priceItem: Prices, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/prices.json`, priceItem);
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to post prices data');
  }
});
