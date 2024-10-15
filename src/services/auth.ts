import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { LoginData, LoginResponse, TUpdateMe, TUser } from "../@types";

export const useAuthService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const login = useCallback(
    async (data: LoginData): Promise<LoginResponse> => {
      return (await axiosInstance.post("/login", data)).data;
    },
    [axiosInstance]
  );

  const getMe = useCallback(async (): Promise<TUser> => {
    return (await axiosInstance.get("/me")).data;
  }, [axiosInstance]);

  const updateMe = useCallback(
    async (data: TUpdateMe): Promise<TUser> => {
      return (await axiosInstance.patch("/me", data)).data;
    },
    [axiosInstance]
  );

  return { login, getMe, updateMe };
};
