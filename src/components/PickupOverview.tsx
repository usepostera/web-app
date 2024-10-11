import React from "react";
import { formatLargeNumber } from "../lib/helpers";

type Props = {
  count: number;
  title: string;
};

const PickupOverview: React.FC<Props> = (props) => {
  const { title, count } = props;

  return (
    <div className="w-[140px] min-h-[79px] rounded-[6px] border-[1px] border-[#0000004D] p-2">
      <p className="font-normal text-[12px] leading-[14.63px] mb-2">{title}</p>

      <p className="font-semibold text-[20px] leading-[22px]">
        {formatLargeNumber(count)}
      </p>
    </div>
  );
};

export default PickupOverview;
