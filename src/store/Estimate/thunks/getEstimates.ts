import { createAsyncThunk } from '@reduxjs/toolkit';
import { EstimateType } from '../../../types/estimate';
import axios from 'axios';
import { BASE_URL } from '../../../constants/api';

export const getEstimates = createAsyncThunk<
{ [key: string]: EstimateType },
  undefined,
  { rejectValue: string }
>('getEstimates', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/estimates.json`);
    // const estimates: Estimate[] = Object.values(response.data);
    // console.log(estimates);
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load estimates');
  }
});
