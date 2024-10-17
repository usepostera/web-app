import React, { useMemo } from "react";
import SimpleAnimatedComponent from "../SimpleAnimatedComponent";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import Loader from "../Loader";
import Button from "../Button";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import { formatLargeNumber } from "../../lib/helpers";
import { useMe } from "../../hooks/useMe";
const Leaderboard: React.FC = () => {
  const month = useMemo(
    () =>
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1).toString().padStart(2, "0"),
    []
  );

  const {
    loading,
    leaderboard: items,
    refresh,
    position,
    totalUsers,
    percentile,
  } = useLeaderboard();

  const { me, loading: loadingMe } = useMe();

  const { address, isConnected, chain } = useAccount();

  return (
    <>
      {(loading || loadingMe) && <Loader size={20} />}
      <SimpleAnimatedComponent>
        <div className="flex flex-col gap-6">
          <div>
            <div className="w-fit mb-2">
              <Button.Text
                label="Refresh"
                onClick={refresh}
                disabled={loading}
              />
            </div>

            <h3 className="text-[20px] leading-[24.38px] font-semibold">
              Leaderboard
            </h3>
          </div>

          {!loading && (
            <SimpleAnimatedComponent className="delay-300">
              <div className="rounded-[20px] w-full bg-white py-[14px] space-y-[8px] drop-shadow-md overflow-hidden">
                <div className="p-4 border-b-[1px] border-black flex flex-row justify-between items-end">
                  <div className="space-y-1">
                    {isConnected && (
                      <Avatar
                        address={address}
                        chain={chain}
                        className="h-[40px] w-[40px]"
                      />
                    )}

                    <p className="text-[16px] leading-[19.5px]">
                      Rank #{position}
                    </p>
                    <p className="text-[12px] leading-[14.63px]">
                      {me?.monthlyScores[month] ?? 0} points
                    </p>
                  </div>

                  <div className="space-y-1">
                    {percentile && (
                      <p className="text-[16px] leading-[19.5px]">
                        {percentile}
                      </p>
                    )}
                    {totalUsers && (
                      <p className="text-[12px] leading-[14.63px]">
                        Out of {totalUsers} users
                      </p>
                    )}
                  </div>
                </div>

                {isConnected && (
                  <div className="list-decimal list-inside space-y-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border-b-[1px] border-black last:border-b-[0px]"
                      >
                        <div className="flex flex-row gap-[22px] items-center">
                          <span className="text-[16px] leading-[19.5px] font-semibold">
                            {index + 1}
                          </span>
                          <Avatar
                            className="h-[40px] w-[40px]"
                            address={item.walletAddress as `0x${string}`}
                            chain={chain}
                          />

                          <Name
                            address={item.walletAddress as `0x${string}`}
                            chain={chain}
                            className="text-[14px] leading-[17.05px] font-normal"
                          />

                          <div className="w-full flex flex-row justify-end">
                            <span className="ml-auto">
                              {formatLargeNumber(item.monthlyScores[month])}{" "}
                              points
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SimpleAnimatedComponent>
          )}
        </div>
      </SimpleAnimatedComponent>
    </>
  );
};

export default Leaderboard;
