import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPickupRequest } from "../@types";

type PickupRequestState = {
  data: TPickupRequest[];
  isInitialzed: boolean;
};

const initialState: PickupRequestState = {
  isInitialzed: false,
  data: [],
};

const pickupRequestSlice = createSlice({
  name: "pickupRequest",
  initialState,
  reducers: {
    initializePickupRequests: (
      state,
      action: PayloadAction<TPickupRequest[]>
    ) => {
      state.data = action.payload;
      if (action.payload.length > 0) {
        state.isInitialzed = true;
      }
    },
    insertNewPickupRequest: (state, action: PayloadAction<TPickupRequest>) => {
      state.data = [action.payload, ...state.data];
    },
  },
});

export const { initializePickupRequests, insertNewPickupRequest } =
  pickupRequestSlice.actions;
export default pickupRequestSlice.reducer;
