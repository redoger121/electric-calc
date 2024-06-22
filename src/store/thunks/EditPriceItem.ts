import { createAsyncThunk } from '@reduxjs/toolkit';
import { Price} from '../../types/price';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';

type EditThunkArgType = {
  priceItem: Price;
  index: number;
};

export const editPrice = createAsyncThunk<
  Price,
  EditThunkArgType,
  { rejectValue: string }
>('editPrice', async (args: EditThunkArgType, thunkAPI) => {
  const { index, priceItem } = args;
  try {
    const response = await axios.patch(
      `${BASE_URL}/prices/${index}.json`,
      priceItem
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to post prices data');
  }
});
