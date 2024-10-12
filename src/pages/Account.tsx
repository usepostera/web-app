import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";
import { Address, Avatar } from "@coinbase/onchainkit/identity";
import LocationIcon from "../assets/svgs/location.svg";
import { AccountTile } from "../components/AccountTile";
import NotificationIcon from "../assets/svgs/notification-bing.svg";
import { TbLogout2 } from "react-icons/tb";
import { Outlet } from "react-router-dom";

const Account: React.FC = () => {
  return (
    <div className="flex flex-row gap-8 p-4 md:p-8 md:!pt-12">
      <div className="flex-1 max-w-[378px]">
        <Wallet className="w-full">
          <ConnectWallet className="bg-transparent hover:bg-transparent p-4">
            <Avatar />
            <Address
              className="my-auto font-medium text-[16px]"
              isSliced={true}
            />
          </ConnectWallet>
        </Wallet>

        <AccountTile
          Icon={<LocationIcon />}
          title="Addresses"
          route="/account/addresses"
        />

        <AccountTile
          Icon={<NotificationIcon />}
          title="Notification Settings"
          route="/account/notification-settings"
        />

        <AccountTile
          Icon={<TbLogout2 color="#D80700" size={24} />}
          title="Log out"
          className="text-[#D80700]"
          route="/logout"
        />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

const AccountPage = withAuthRedirect(Account);
export default AccountPage;
