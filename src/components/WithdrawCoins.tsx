import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppBottomSheetWrapper } from "./AppBottomSheet";
import AmountInput from "./AmountInput";
import classNames from "classnames";
import Button from "./Button";
import RippleEffect from "./Ripple";
import { IoCloseCircle } from "react-icons/io5";
import { useAccount } from "wagmi";
import { deployedContract } from "../lib/constants";
import { useForm } from "../hooks/useForm";
import { FormFieldValidator } from "../lib/FormFieldValidator";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { parseEther } from "ethers";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { wagmiConfig } from "../config/wagmi";
import { parseAbi } from "viem";
import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  balance: { formattedBalance: string; eth: string };
};

const WithdrawCoins: React.FC<Props> = (props) => {
  const { isOpen, balance } = props;
  const [isVisible, setIsVisible] = useState(false);

  const { address, chainId } = useAccount();
  const abi = parseAbi(["function withdraw(uint256)"]);

  const validators = useMemo(() => {
    return {
      amount: new FormFieldValidator([
        {
          rule: "min",
          min: 0.0038,
          message: "Minimum withdrawal amount is 0.0038 ETH",
        },
        {
          rule: "max",
          max: Number(balance.eth),
          message: `Maximum withdrawal amount is ${balance.eth} ETH`,
        },
      ]),
    };
  }, [balance.eth]);

  const {
    form,
    validate,
    formErrors,
    onChangeText,
    reset: resetForm,
  } = useForm<{ amount: string }>({ amount: "" }, validators);

  const reset = useCallback(() => {
    setIsVisible(false);
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    setIsVisible(isOpen);
    if (!isOpen) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(props.onClose, 300);
  }, [props.onClose]);

  const { data: availableCapabilities } = useCapabilities({
    account: address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !chainId) return;
    const capabilitiesForChain = availableCapabilities[chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/Mpvo9ZhDVRL9PeM0rYK27NTxWh7CeJXu",
        },
      };
    }
  }, [availableCapabilities, chainId]);

  const { writeContractsAsync } = useWriteContracts({
    config: wagmiConfig,
  });

  const { trigger, loading } = useRequestHandler(writeContractsAsync);

  const submitForm = useCallback(async () => {
    if (validate()) {
      const weiValue = parseEther(form.amount.toString());

      console.log(weiValue, form.amount);

      const result = await trigger({
        contracts: [
          {
            abi,
            address: deployedContract.address as `0x${string}`,
            functionName: "withdraw",
            args: [weiValue],
          },
        ],
        capabilities,
      });

      console.log("[result]", result);

      if (result) {
        toast.success(
          `${form.amount.toString()} ETH sent to your smart wallet`
        );
      }
    }
  }, [validate, form.amount, trigger, abi, capabilities]);

  useEffect(() => {
    if (isOpen) {
      onChangeText("amount")(balance.eth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, isOpen]);

  return (
    <AppBottomSheetWrapper
      {...props}
      onClose={() => {}}
      modalClassName="!p-0 max-h-none"
    >
      <div>
        <div className="w-full md:w-[300px] font-monserrat">
          <div className="bg-primary text-white p-6 rounded-b-[40px]">
            <div className="flex flex-row justify-between mb-3">
              <h3 className="text-[18px] font-semibold leading-[22.5px]">
                Withdraw
              </h3>

              <RippleEffect className="rounded-full" onClick={handleClose}>
                <IoCloseCircle size={28} />
              </RippleEffect>
            </div>

            <p className="text-[16px] leading-[19.5px]">Balance</p>
            <p className="text-[24px] leading-[36.88px] font-medium">
              {balance.formattedBalance}{" "}
              <span className="text-[16px] leading-[19.5px]">ETH</span>
            </p>

            <p className="text-[12px] leading-[15px]">Max {balance.eth}</p>
          </div>

          <div
            className={classNames(
              "overflow-hidden transition-all duration-500 ease-in-out delay-300",
              {
                "max-h-0": !isVisible,
                "max-h-[500px]": isVisible,
              }
            )}
          >
            <div className="p-6">
              <AmountInput
                value={form.amount}
                onChange={onChangeText("amount")}
                error={formErrors.amount}
                disabled
              />

              {isOpen && (
                <div className="mt-6">
                  <Button.Sliding
                    onComplete={submitForm}
                    loading={loading}
                    label="Slide to confirm"
                  />
                </div>
              )}

              {isOpen && (
                <p className="mt-4 text-[12px] leading-[15px] text-gray-600">
                  <span className="mb-1">
                    <FaCircleInfo />
                  </span>{" "}
                  Note: You can only withdraw full ETH earned to your wallet at
                  the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppBottomSheetWrapper>
  );
};

export default WithdrawCoins;
