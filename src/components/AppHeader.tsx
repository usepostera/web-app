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
import Logo from "../assets/svgs/logo-transparent-2.svg";
import { IoIosMenu } from "react-icons/io";
import { useEffect, useState } from "react";

const pathnameMapping: { [key: string]: string } = {
  "/": "Home",
  "/pickups": "Pickups",
};

const AppHeader = () => {
  const { pathname } = useLocation();
  const { chain, address } = useAccount();

  const [title, setTitle] = useState(pathnameMapping[pathname]);
  const [showTitle, setShowTitle] = useState(true);

  const changeText = (text: string) => {
    setShowTitle(false); // Hide text
    setTimeout(() => {
      setTitle(text);
      setShowTitle(true); // Show updated text
    }, 300); // Duration should match your Tailwind transition duration
  };

  useEffect(() => {
    if (pathname === "/" && title !== pathnameMapping["/"]) {
      changeText(pathnameMapping[pathname]);
    } else {
      const newTitle = pathnameMapping[pathname];

      if (newTitle && newTitle !== title) {
        changeText(newTitle);
      }
    }

    return () => {
      setTitle(pathnameMapping[pathname]);
      setShowTitle(true);
    };
  }, [pathname, title]);

  return (
    <header className="bg-[#F7F7F7] h-[70px] md:pr-8 fixed w-full z-10 top-0 left-0 md:pl-72 flex flex-row justify-between items-center">
      <div
        className={`hidden md:block font-montserrat text-[24px] leading-[29.26px] font-semibold text-black transition-opacity duration-300 ${
          showTitle ? "opacity-100" : "opacity-0"
        }`}
      >
        {title}
      </div>

      <div className="block md:hidden ">
        <div className="ml-4 flex flex-row gap-2 items-center">
          <Logo height={50} width={50} />
          <h1 className="text-xl">Postera</h1>
        </div>
      </div>

      <div className="hidden md:block max-w-[323px] flex-1">
        <Inputs.Text
          placeholder="Search here"
          className="!bg-[#0000000D] border-none !rounded-[40px] h-[50px] pl-4"
          prefixIcon={<SearchIcon />}
        />
      </div>

      <div className="flex flex-row gap-4">
        <Wallet>
          <ConnectWallet className="bg-[#0000000D] hover:bg-[#0000004D]">
            <Avatar className="h-6 w-6" address={address} chain={chain} />
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

        <button title="menu" type="button" className="block md:hidden mr-4">
          <IoIosMenu size={30} />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
