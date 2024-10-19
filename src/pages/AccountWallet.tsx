import React, { useMemo, useState } from "react";
import { formatUnits } from "ethers";
import withAuthRedirect from "../hoc/withAuthRedirect";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import { useMe } from "../hooks/useMe";
import Loader from "../components/Loader";
import MoneyIcon from "../assets/svgs/moneys.svg";
import RippleEffect from "../components/Ripple";
import { PayoutList } from "../components/PayoutList";
import WithdrawCoins from "../components/WithdrawCoins";
import { useAccount, useReadContract } from "wagmi";
import { deployedContract } from "../lib/constants";
import { EthBalance } from "@coinbase/onchainkit/identity";

const AccountWallet: React.FC = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const { me, loading } = useMe();

  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    address: deployedContract.address as `0x${string}`,
    abi: deployedContract.abi,
    functionName: "getWasteEarnings",
    args: [address],
  });

  const eth = useMemo(() => {
    if (typeof data === "bigint") {
      const eth = formatUnits(data, "ether");
      const formattedBalance = parseFloat(eth).toFixed(4);
      return { formattedBalance, eth, wei: data };
    }
    return { formattedBalance: "0", eth: "0" };
  }, [data]);

  if (isLoading || loading || !me) {
    return <Loader size={20} />;
  }

  return (
    <>
      <WithdrawCoins
        isOpen={isWithdrawOpen}
        balance={eth}
        onClose={() => setIsWithdrawOpen(false)}
      />

      <SimpleAnimatedComponent>
        <div className="">
          <div className="flex flex-row flex-wrap gap-4 md:!gap-8">
            <div>
              <p className="text-[14px] leading-[17.5px] font-light">
                Earned Balance
              </p>
              <p className="text-[36px] leading-[43.88px] font-medium md:mb-8">
                {eth.formattedBalance} <span>ETH</span>
              </p>
            </div>

            <div>
              <p className="text-[14px] leading-[17.5px] font-light">
                Wallet Balance
              </p>
              <div className="text-[36px] leading-[43.88px] font-medium mb-8">
                <EthBalance
                  className="text-[36px] leading-[43.88px] font-medium mb-8 text-black"
                  address={address}
                />
              </div>
            </div>
          </div>

          <RippleEffect
            className="w-[160px] h-[120px] rounded-[12px] bg-[#32CD3266] p-4 mb-8"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <div className="flex flex-col gap-4">
              <div className="bg-white h-[40px] w-[40px] rounded-full p-1 flex justify-center items-center">
                <MoneyIcon />
              </div>

              <p className="text-left text-[#228B22] font-semibold text-[20px] leading-[22px]">
                Withdraw
              </p>
            </div>
          </RippleEffect>

          <p className="mb-2 text-[20px] leading-[22px] mb-4">Payout history</p>

          <div className="md:max-w-[380px]">
            <PayoutList />
          </div>
        </div>
      </SimpleAnimatedComponent>
    </>
  );
};

const AccountWalletPage = withAuthRedirect(AccountWallet);
export default AccountWalletPage;
