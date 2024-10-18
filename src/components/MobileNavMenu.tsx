import React, { useEffect } from "react";
import { AppBottomSheetWrapper } from "./AppBottomSheet";
import NavLink from "./NavLink";
import Logo from "../assets/svgs/logo-transparent-2.svg";
import { useLocation } from "react-router-dom";
import { LOCATION_MAPPINGS } from "../lib/constants";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const MobileNavMenu: React.FC<Props> = (props) => {
  const { pathname } = useLocation();

  const { isOpen, onClose } = props;

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AppBottomSheetWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-14 items-center">
        <div className="flex flex-col items-center gap-4">
          <NavLink
            label="Home"
            isActive={pathname === LOCATION_MAPPINGS.home}
            route="/"
          />

          <NavLink
            label="Notifications"
            route="/notifications"
            isActive={pathname.startsWith(LOCATION_MAPPINGS.notification)}
          />

          <NavLink
            label="Pickups"
            route="/pickups"
            isActive={pathname.startsWith(LOCATION_MAPPINGS.pickup)}
          />

          <NavLink
            label="Volunteer"
            route="/volunteer"
            isActive={pathname.startsWith(LOCATION_MAPPINGS.volunteer)}
          />

          <NavLink
            label="Account"
            route="/account"
            isActive={pathname.startsWith(LOCATION_MAPPINGS.account)}
          />
        </div>

        <div>
          <div className="flex flex-row gap-2 items-center">
            <Logo height={50} width={50} />
            <h1 className="text-xl">Postera</h1>
          </div>
        </div>
      </div>
    </AppBottomSheetWrapper>
  );
};
