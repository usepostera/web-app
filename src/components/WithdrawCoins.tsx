import React, { useCallback, useEffect, useState } from "react";
import { AppBottomSheetWrapper } from "./AppBottomSheet";
import { useMe } from "../hooks/useMe";
import Loader from "./Loader";
import { numberWithCommas } from "../lib/helpers";
import AmountInput from "./AmountInput";
import classNames from "classnames";
import Button from "./Button";
import RippleEffect from "./Ripple";
import { IoCloseCircle } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WithdrawCoins: React.FC<Props> = (props) => {
  const { isOpen } = props;
  const { me, loading } = useMe();

  const [isVisible, setIsVisible] = useState(false);

  const [amount, setAmount] = useState("");

  const reset = () => {
    setIsVisible(false);
    setAmount("");
  };

  useEffect(() => {
    setIsVisible(isOpen);
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(props.onClose, 300);
  }, [props.onClose]);

  const submitForm = useCallback(async () => {}, []);

  return (
    <AppBottomSheetWrapper
      {...props}
      onClose={() => {}}
      modalClassName="!p-0 max-h-none"
    >
      <div>
        {loading && <Loader size={20} />}

        <div className="w-full md:min-w-[300px] font-monserrat">
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
              {numberWithCommas(me?.coins ?? 0)}{" "}
              <span className="text-[16px] leading-[19.5px]">Coins</span>
            </p>
            <p className="text-[12px] font-light">1 coin = 1 cent</p>
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
              <AmountInput value={amount} onChange={setAmount} />

              {isOpen && (
                <div className="mt-2">
                  <Button.Sliding
                    onComplete={submitForm}
                    label="Slide to confirm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppBottomSheetWrapper>
  );
};

export default WithdrawCoins;
