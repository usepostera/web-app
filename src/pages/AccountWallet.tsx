import React, { useState } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import { useMe } from "../hooks/useMe";
import Loader from "../components/Loader";
import { numberWithCommas } from "../lib/helpers";
import MoneyIcon from "../assets/svgs/moneys.svg";
import RippleEffect from "../components/Ripple";
import { PayoutList } from "../components/PayoutList";
import WithdrawCoins from "../components/WithdrawCoins";

const AccountWallet: React.FC = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const { me, loading } = useMe();

  if (loading || !me) {
    return <Loader size={20} />;
  }

  return (
    <>
      <WithdrawCoins
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />

      <SimpleAnimatedComponent>
        <div className="md:max-w-[380px]">
          <p className="text-[36px] leading-[43.88px] font-medium mb-8">
            {numberWithCommas(me.coins)}{" "}
            <span className="text-[16px] leading-[19.5px]">Coins</span>
          </p>

          <RippleEffect
            className="w-[160px] h-[120px] rounded-[12px] bg-[#32CD3266] p-4 flex flex-col gap-4 mb-8"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <div className="bg-white h-[40px] w-[40px] rounded-full p-1 flex justify-center items-center">
              <MoneyIcon />
            </div>

            <p className="text-[#228B22] font-semibold text-[20px] leading-[22px]">
              Withdraw
            </p>
          </RippleEffect>

          <p className="mb-2 text-[20px] leading-[22px]">Payout history</p>
          <PayoutList />
        </div>
      </SimpleAnimatedComponent>
    </>
  );
};

const AccountWalletPage = withAuthRedirect(AccountWallet);
export default AccountWalletPage;
