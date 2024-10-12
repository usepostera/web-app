import React, { useCallback, useEffect, useState } from "react";
import { TPickupRequest } from "../@types";
import { usePickupService } from "../services/pickup";
import { useRequestHandler } from "../hooks/useRequestHandler";
import Loader from "./Loader";
import { baseURL } from "../lib/axiosInstance";
import { capitalize, formatLargeNumber } from "../lib/helpers";
import { recyclableUnitDescriptionMapping } from "../lib/constants";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { PickupStatusBadge } from "./PickupStatusBadge";

type Props = {
  id: string;
};

export const PickupDetails: React.FC<Props> = (props) => {
  const { id } = props;
  const [data, setData] = useState<TPickupRequest | null>(null);

  const { getPickupById } = usePickupService();
  const { trigger, loading } = useRequestHandler(getPickupById);

  const httpFetchPickup = useCallback(
    async (id: string) => {
      const result = await trigger(id);
      if (result) {
        setData(result);
      }
    },
    [trigger]
  );

  useEffect(() => {
    if (id) {
      httpFetchPickup(id);
    }

    return () => {
      setData(null);
    };
  }, [httpFetchPickup, id]);

  if (loading) {
    return <Loader size={30} />;
  }

  if (!data) {
    return <p className="text-xl text-black">Pickup request not found</p>;
  }

  return (
    <SimpleAnimatedComponent className="delay-300">
      <div className="py-[8px] px-[12px] w-full max-w-[388px] rounded-[12px] border-[1px] border-[#0000004D] space-y-[12px]">
        <img
          src={`${baseURL}/${data.item.image}`}
          alt=""
          className="w-full h-[190px] object-cover rounded-[8px]"
        />

        <div className="space-y-[8px]">
          <h3 className="text-black text-[16px] leading-[24px] font-semibold">
            {data.item.name}
          </h3>

          <div className="flex flex-row justify-between text-[14px] leading-[24px]">
            <p className="font-light">
              {capitalize(recyclableUnitDescriptionMapping[data.item.unit])}
            </p>

            <p>
              {data.size} {data.item.unit}
            </p>
          </div>

          <div className="flex flex-row justify-between text-[14px] leading-[24px]">
            <p className="font-light">Address</p>

            <p>{data.address.address}</p>
          </div>

          <div className="flex flex-row justify-between text-[14px] leading-[24px]">
            <p className="font-light">Pickup Date</p>

            <p>
              {data.pickup_date
                ? new Date(data.pickup_date).toDateString()
                : "-"}
            </p>
          </div>

          <div className="flex flex-row justify-between text-[14px] leading-[24px]">
            <p className="font-light">Payout</p>

            <p>{formatLargeNumber(data.amount)} coins</p>
          </div>

          <div className="flex flex-row justify-between text-[14px] leading-[24px]">
            <p className="font-light">Status</p>

            <PickupStatusBadge status={data.status} />
          </div>

          {data.date_completed && (
            <div className="flex flex-row justify-between text-[14px] leading-[24px]">
              <p className="font-light">Date Completed</p>

              <p>{new Date(data.date_completed).toDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </SimpleAnimatedComponent>
  );
};
