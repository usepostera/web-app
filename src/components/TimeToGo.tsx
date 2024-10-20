import { formatDistance } from "date-fns";
import React from "react";

interface Props {
  date: string | Date;
}

const TimeToGo: React.FC<Props> = ({ date }) => {
  const formattedTime = formatDistance(new Date(), new Date(date));

  return <div className="text-gray-600 text-sm">{formattedTime} to go</div>;
};

export default TimeToGo;
