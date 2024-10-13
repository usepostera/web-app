import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { PickupRequestInput, TPickupRequest } from "../@types";

export const usePickupService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const requestNewPickup = useCallback(
    async (
      data: PickupRequestInput & { recyclable: string }
    ): Promise<TPickupRequest> => {
      return (await axiosInstance.post("/pickup", data)).data;
    },
    [axiosInstance]
  );

  const getMyPickups = useCallback(
    async (
      page = 1
    ): Promise<{
      data: TPickupRequest[];
      total: number;
      page: number;
      totalPages: number;
    }> => {
      return (await axiosInstance.get(`/pickup/own?page=${page}&limit=20`))
        .data;
    },
    [axiosInstance]
  );

  const getPickupById = useCallback(
    async (id: string) => {
      const res = await axiosInstance.get(`/pickup/${id}`);
      return res.data;
    },
    [axiosInstance]
  );

  const confirmPickupMeasurement = useCallback(
    async (id: string): Promise<{ message: string }> => {
      const res = await axiosInstance.post(
        `/pickup/${id}/accept-complete-request`
      );
      return res.data;
    },
    [axiosInstance]
  );

  return {
    requestNewPickup,
    getMyPickups,
    getPickupById,
    confirmPickupMeasurement,
  };
};
