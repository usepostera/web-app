import { useCallback, useMemo } from "react";
import { useAppSelector } from "../store/store";
import instance from "../lib/axiosInstance";
import { TVolunteerEvent } from "../@types";

export const useVolunteerService = () => {
  const token = useAppSelector((state) => state.auth.token);

  const axiosInstance = useMemo(() => {
    return instance(token ?? undefined);
  }, [token]);

  const getEvents = useCallback(
    async (
      page = 1,
      own: boolean
    ): Promise<{
      data: TVolunteerEvent[];
      total: number;
      page: number;
      totalPages: number;
    }> => {
      if (!own) {
        return (
          await axiosInstance.get(`/volunteer/open?page=${page}&limit=20`)
        ).data;
      }

      return (await axiosInstance.get(`/volunteer/own?page=${page}&limit=20`))
        .data;
    },
    [axiosInstance]
  );

  const getEvent = useCallback(
    async (id: string): Promise<TVolunteerEvent> => {
      return (await axiosInstance.get(`/volunteer/${id}`)).data;
    },
    [axiosInstance]
  );

  const joinEvent = useCallback(
    async (id: string): Promise<TVolunteerEvent> => {
      return (await axiosInstance.post(`/volunteer/join`, { id })).data;
    },
    [axiosInstance]
  );

  return { getEvents, getEvent, joinEvent };
};
