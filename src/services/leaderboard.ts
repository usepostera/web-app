import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TLeaderboardData } from "../@types";

export const useLeaderboardService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getMonthly = useCallback(async (): Promise<{
    leaderboard: TLeaderboardData[];
    position: number;
    totalUsers: number;
    percentile: number;
  }> => {
    return (await axiosInstance.get("/leaderboard/monthly")).data;
  }, [axiosInstance]);

  return { getMonthly };
};
