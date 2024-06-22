import { createAsyncThunk } from '@reduxjs/toolkit';
import { EstimateType } from '../../../types/estimate';
import { BASE_URL } from '../../../constants/api';
import axios from 'axios';

export const addEstimate = createAsyncThunk<
  { [key: string]: EstimateType },
  EstimateType,
  { rejectValue: string }
>('addestimate', async (estimate: EstimateType, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/estimates.json`, estimate);
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to save estimate data');
  }
});
