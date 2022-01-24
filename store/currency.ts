import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Currency = '$' | '£' | 'A$' | '¥' | '₽';
export interface CurrencyState {
  value: Currency;
}

const initialState: CurrencyState = {
  value: '$',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Currency>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = currencySlice.actions;

export default currencySlice.reducer;
