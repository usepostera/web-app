import { useCallback, useEffect } from "react";
import { useRequestHandler } from "./useRequestHandler";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useUserService } from "../services/user";
import { initializeUserWithdrawals } from "../store/withdrawalSlice";

export const useUserWithdrawals = () => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.withdrawal.isInitialzed);
  const withdrawals = useAppSelector((state) => state.withdrawal.data);

  const { getWithdrawals } = useUserService();
  const { trigger, loading } = useRequestHandler(getWithdrawals);

  const httpFetchWithdrawals = useCallback(async () => {
    const result = await trigger();

    if (result) {
      dispatch(initializeUserWithdrawals(result));
    }
  }, [dispatch, trigger]);

  useEffect(() => {
    if (!initialized) {
      httpFetchWithdrawals();
    }
  }, [initialized, httpFetchWithdrawals]);

  return { loading, withdrawals };
};
