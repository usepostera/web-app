import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TWithdrawal } from "../@types";

export const useUserService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getWithdrawals = useCallback(async (): Promise<TWithdrawal[]> => {
    return (await axiosInstance.get("/me/withdrawals")).data;
  }, [axiosInstance]);

  return { getWithdrawals };
};
