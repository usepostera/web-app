import { formatUnits } from "ethers";
import { useUserWithdrawals } from "../hooks/useUserWithdrawals";
import CopyableText from "./CopyableText";
import Loader from "./Loader";
import { FaCoins } from "react-icons/fa";

export const PayoutList: React.FC = () => {
  const { loading, withdrawals } = useUserWithdrawals();
  console.log(withdrawals);

  if (loading) {
    return <Loader size={20} />;
  }

  return (
    <div>
      {withdrawals.map((item) => {
        const eth = formatUnits(item.amount, "ether");

        return (
          <div
            key={item.transactionHash}
            className="border-[1px] border-[#0000004D] rounded-[12px] p-4 flex flex-row gap-4 items-center"
          >
            <div className="flex items-center justify-center rounded-full h-[50px] w-[50px] bg-primary">
              <div className="rounded-full h-[70%] w-[70%] rounded-full border-[1.5px] border-white p-2 flex justify-center items-center">
                <FaCoins size={16} color="#ffffff" />
              </div>
            </div>

            <div>
              <CopyableText
                text={item.transactionHash?.toString() ?? "-"}
                previewLength={20}
                className="text-[12px] leading-[22px]"
              />

              <p>{new Date(item.timestamp * 1000).toDateString()}</p>
            </div>

            <div className="ml-auto">
              <p>{Number(eth).toFixed(4)} ETH</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
