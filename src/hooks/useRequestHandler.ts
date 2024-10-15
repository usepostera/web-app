/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useRef, useState } from "react";
import { useLogout } from "./useLogout";
import { parseApiError } from "../lib/parseError";
import toast from "react-hot-toast";
import { TRawApiError } from "../@types";

export const useRequestHandler = <T extends (...args: any[]) => any>(
  fn: T,
  options?: {
    onError?: (msg: string) => void;
    rawError?: (data: TRawApiError) => boolean;
  }
) => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const { onError, rawError } = options ?? {};

  const logout = useLogout();

  const trigger = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
      if (loadingRef.current) {
        return;
      }

      try {
        loadingRef.current = true;
        setLoading(true);
        return await fn(...args);
      } catch (error: any) {
        if (error.name === "CanceledError") {
          return;
        }
        const message = parseApiError(error);

        if (error.response?.status === 401) {
          logout();
          return;
        }

        if (rawError && error?.response?.data) {
          const handled = rawError(error?.response?.data);
          if (handled) {
            return;
          }
        }

        if (onError) {
          onError(message);
        } else {
          // show error
          toast.error(message);
        }
        return;
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [fn, rawError, onError, logout]
  );

  const data = useMemo(
    () => ({
      trigger,
      loading,
    }),
    [trigger, loading]
  );

  return data;
};
