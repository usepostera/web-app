import { useCallback, useEffect, useState } from "react";
import { TUpdateMe, TUser } from "../@types";
import { useAuthService } from "../services/auth";
import { useRequestHandler } from "./useRequestHandler";
import toast from "react-hot-toast";

export type Props = {
  updateUserHandlerOptions?: Parameters<typeof useRequestHandler>[1];
};

export const useMe = (options?: Props) => {
  const [me, setMe] = useState<TUser | null>(null);

  const { getMe, updateMe } = useAuthService();
  const { trigger: triggerGetMe, loading } = useRequestHandler(getMe);
  const httpFetchMe = useCallback(async () => {
    const result = await triggerGetMe();

    if (result) {
      setMe(result);
    }
  }, [triggerGetMe]);

  const { trigger: triggerUpdateMe, loading: updatingMe } = useRequestHandler(
    updateMe,
    options?.updateUserHandlerOptions
  );

  const httpUpdateMe = useCallback(
    async (data: TUpdateMe) => {
      const result = await triggerUpdateMe(data);
      if (result) {
        toast.success("Successful");
        setMe(result);
        return true;
      }

      return false;
    },
    [triggerUpdateMe]
  );

  useEffect(() => {
    if (!me) {
      httpFetchMe();
    }
  }, [httpFetchMe, me]);

  return { me, loading, updatingMe, httpUpdateMe };
};
