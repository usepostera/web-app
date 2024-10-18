import { formatDistanceToNow } from "date-fns";
import React from "react";

interface Props {
  createdAt: string | Date;
}

const CreatedAt: React.FC<Props> = ({ createdAt }) => {
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return <div className="text-gray-600 text-sm">Created {formattedTime}</div>;
};

export default CreatedAt;
