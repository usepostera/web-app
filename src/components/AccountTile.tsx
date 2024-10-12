import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

type Props = {
  Icon: React.ReactNode;
  title: string;
  route: string;
  className?: string;
};

export const AccountTile: React.FC<Props> = (props) => {
  const { Icon, title, className, route } = props;

  return (
    <Link
      to={route}
      className={`cursor-pointer flex flex-row justify-between items-center gap-8 hover:bg-gray-100 transition-color duration-200 p-4 ${className}`}
    >
      <div className="flex-1 flex flex-row items-center gap-2">
        {Icon}

        <p>{title}</p>
      </div>

      <SlArrowRight color="#000000" />
    </Link>
  );
};
