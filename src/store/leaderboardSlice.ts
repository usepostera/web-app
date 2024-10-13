import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLeaderboardData } from "../@types";

type LeaderboadState = {
  position: number | null;
  totalUsers: number | null;
  percentile: number | null;
  data: TLeaderboardData[];
  isInitialzed: boolean;
};

const initialState: LeaderboadState = {
  isInitialzed: false,
  data: [],
  position: null,
  totalUsers: null,
  percentile: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    initializeLeaderboard: (
      state,
      action: PayloadAction<{
        leaderboard: TLeaderboardData[];
        position: number;
        totalUsers: number;
        percentile: number;
      }>
    ) => {
      state.data = action.payload.leaderboard;
      state.position = action.payload.position;
      state.totalUsers = action.payload.totalUsers;
      state.percentile = action.payload.percentile;
      if (action.payload.leaderboard.length > 0) {
        state.isInitialzed = true;
      }
    },
  },
});

export const { initializeLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
