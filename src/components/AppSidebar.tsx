import Logo from "../assets/svgs/logo-transparent-2.svg?react";
import NavItem from "./NavLink";

import HomeIcon from "../assets/svgs/home_icon.svg?react";
import NotificationIcon from "../assets/svgs/notification.svg?react";
import TruckIcon from "../assets/svgs/truck.svg?react";
import AwardIcon from "../assets/svgs/award.svg?react";
import ProfileIcon from "../assets/svgs/profile-circle.svg?react";

const AppSidebar = () => {
  return (
    <aside className="w-64 bg-[#EFEFEF80] fixed h-full z-20">
      <div className="p-4 h-[70px] text-lg font-semibold bg-[#f2f2f2] flex flex-row items-center">
        <div className="flex flex-row gap-2 items-center">
          <Logo height={50} width={50} />
          <h1 className="text-xl">Postera</h1>
        </div>
      </div>

      <nav className="px-4 mt-12">
        <ul className="mt-4 space-y-2">
          <li>
            <NavItem label="Home" isActive={true} route="/" Icon={HomeIcon} />
          </li>

          <li>
            <NavItem
              label="Notifications"
              route="/notifications"
              Icon={NotificationIcon}
            />
          </li>

          <li>
            <NavItem label="Pickups" route="/pickups" Icon={TruckIcon} />
          </li>

          <li>
            <NavItem
              label="Leaderboard"
              route="/leaderboard"
              Icon={AwardIcon}
            />
          </li>

          <li>
            <NavItem label="Account" route="/account" Icon={ProfileIcon} />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;
