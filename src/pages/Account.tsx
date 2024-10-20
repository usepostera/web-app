import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";
import { Address, Avatar } from "@coinbase/onchainkit/identity";
import LocationIcon from "../assets/svgs/location.svg";
import { AccountTile } from "../components/AccountTile";
import NotificationIcon from "../assets/svgs/notification-bing.svg";
import { TbLogout2 } from "react-icons/tb";
import { Outlet, useLocation } from "react-router-dom";
import WalletIcon from "../assets/svgs/wallet-money.svg";
import useDeviceView from "../hooks/useDeviceView";
import GoBack from "../components/GoBack";
import { base } from "wagmi/chains";

const Account: React.FC = () => {
  const { pathname } = useLocation();

  const isMobile = useDeviceView();
  const isOpen = pathname !== "/account";

  return (
    <div className="flex flex-col md:!flex-row gap-8 p-4 md:p-8 md:!pt-12 font-montserrat">
      <div
        className={`flex-1 md:max-w-[378px] ${
          isOpen ? "hidden md:block" : "block"
        }`}
      >
        <Wallet className="w-full">
          <ConnectWallet className="bg-transparent hover:bg-transparent p-4">
            <Avatar chain={base} />
            <Address
              className="my-auto font-medium text-[16px]"
              isSliced={true}
            />
          </ConnectWallet>
        </Wallet>

        <AccountTile
          Icon={<WalletIcon />}
          title="Your Wallet"
          route="/account/wallet"
        />

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
        {isOpen && isMobile && <GoBack />}

        <Outlet />
      </div>
    </div>
  );
};

const AccountPage = withAuthRedirect(Account);
export default AccountPage;
