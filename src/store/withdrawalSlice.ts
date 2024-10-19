import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWithdrawal } from "../@types";

type WithdrawalState = {
  data: TWithdrawal[];
  isInitialzed: boolean;
};

const initialState: WithdrawalState = {
  isInitialzed: false,
  data: [],
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {
    initializeUserWithdrawals: (
      state,
      action: PayloadAction<TWithdrawal[]>
    ) => {
      state.data = action.payload;
      if (action.payload.length > 0) {
        state.isInitialzed = true;
      }
    },
  },
});

export const { initializeUserWithdrawals } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
