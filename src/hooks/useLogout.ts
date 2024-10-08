import { useCallback } from "react";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/authSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const signout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return signout;
};
