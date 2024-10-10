import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import Inputs from "./Input";
import SearchIcon from "../assets/svgs/search_icon.svg";
import { Address, Avatar, Identity, Name } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

const pathnameMapping: { [key: string]: string } = {
  "/": "Home",
};

const AppHeader = () => {
  const { pathname } = useLocation();
  const { chain, address } = useAccount();

  return (
    <header className="bg-[#F7F7F7] h-[70px] pr-8 fixed w-full z-10 top-0 left-0 pl-72 flex flex-row justify-between items-center">
      <div className="font-montserrat text-[24px] leading-[29.26px] font-semibold text-black">
        {pathnameMapping[pathname]}
      </div>

      <div className="max-w-[323px] flex-1">
        <Inputs.Text
          placeholder="Search here"
          className="!bg-[#0000000D] border-none !rounded-[40px] h-[50px] pl-4"
          prefixIcon={<SearchIcon />}
        />
      </div>

      <Wallet>
        <ConnectWallet className="bg-[#0000000D] hover:bg-[#0000004D]">
          <Avatar className="h-6 w-6" />
          <Name address={address} chain={chain} />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address className={color.foregroundMuted} />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </header>
  );
};

export default AppHeader;
