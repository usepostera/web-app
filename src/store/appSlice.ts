import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  redirectAfterLogin: string | null;
};

const initialState: AppState = {
  redirectAfterLogin: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRedirectAfterLogin: (state, action: PayloadAction<string | null>) => {
      state.redirectAfterLogin = action.payload;
    },
  },
});

export const { setRedirectAfterLogin } = appSlice.actions;
export default appSlice.reducer;
