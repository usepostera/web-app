import { useCallback, useEffect, useState } from "react";
import { useRequestHandler } from "./useRequestHandler";
import { usePickupService } from "../services/pickup";
import { TPickupRequest } from "../@types";

export const usePickupRequets = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [pickups, setPickups] = useState<TPickupRequest[]>([]);

  const { getMyPickups } = usePickupService();
  const { trigger, loading } = useRequestHandler(getMyPickups);

  const reset = useCallback(() => {
    setPage(1);
    setTotal(0);
    setTotalPages(0);
    setTotalEarned(0);
    setPickups([]);
  }, []);

  const httpFetchPickups = useCallback(
    async (page: number) => {
      const result = await trigger(page);

      if (result) {
        setPickups((prev) => [...prev, ...result.data]);
        setPage(+result.page);
        setTotal(+result.total);
        setTotalEarned(+result.totalCoinsEarned);
        setTotalPages(+result.totalPages);
      }
    },
    [trigger]
  );

  const loadMore = useCallback(async () => {
    if (page < totalPages && !loading) {
      httpFetchPickups(page + 1);
    }
  }, [httpFetchPickups, loading, page, totalPages]);

  useEffect(() => {
    httpFetchPickups(page);
  }, [httpFetchPickups, page]);

  useEffect(() => {
    return reset;
  }, [reset]);

  return {
    loading,
    pickups,
    loadMore,
    hasMore: page < totalPages,
    total,
    totalEarned,
  };
};
