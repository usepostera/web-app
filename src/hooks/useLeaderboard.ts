import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useRequestHandler } from "./useRequestHandler";
import { useLeaderboardService } from "../services/leaderboard";
import { initializeLeaderboard } from "../store/leaderboardSlice";
import { TUser } from "../@types";
import { useAuthService } from "../services/auth";

export const useLeaderboard = () => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.leaderboard.isInitialzed);
  const leaderboard = useAppSelector((state) => state.leaderboard.data);
  const position = useAppSelector((state) => state.leaderboard.position);
  const totalUsers = useAppSelector((state) => state.leaderboard.totalUsers);
  const percentile = useAppSelector((state) => state.leaderboard.percentile);

  const [me, setMe] = useState<TUser | null>(null);

  const { getMe } = useAuthService();
  const { trigger: triggerGetMe, loading: loadingMe } =
    useRequestHandler(getMe);
  const httpFetchMe = useCallback(async () => {
    const result = await triggerGetMe();

    if (result) {
      setMe(result);
    }
  }, [triggerGetMe]);

  const { getMonthly } = useLeaderboardService();
  const { trigger, loading } = useRequestHandler(getMonthly);

  const httpFetchData = useCallback(async () => {
    const result = await trigger();

    if (result) {
      dispatch(initializeLeaderboard(result));
    }
  }, [dispatch, trigger]);

  useEffect(() => {
    if (!initialized) {
      httpFetchData();
    }
  }, [initialized, httpFetchData]);

  useEffect(() => {
    if (!me) {
      httpFetchMe();
    }
  }, [me, httpFetchMe]);

  return {
    loading,
    leaderboard,
    refresh: httpFetchData,
    position,
    me,
    loadingMe,
    totalUsers,
    percentile,
  };
};
