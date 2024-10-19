import React, { useCallback, useEffect } from "react";
import CustomKeyboard, { TCustomInputKey } from "./CustomKeyboard";
import { TValidatorError } from "../@types";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";

type Props = {
  error: TValidatorError | null;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
};

const AmountInput: React.FC<Props> = ({
  error,
  value: inputValue,
  onChange: setInputValue,
  disabled = false,
}) => {
  const handleKeyPress = useCallback(
    (value: TCustomInputKey) => {
      console.log(value, inputValue);

      if (value === "backspace") {
        setInputValue(inputValue.slice(0, -1));
      } else if (value === ".") {
        if (!inputValue.includes(".") && inputValue.length > 0) {
          setInputValue(inputValue + value);
        }
      } else {
        if (inputValue.startsWith("0") && inputValue.length === 1) {
          setInputValue(String(value));
        } else {
          setInputValue(inputValue + value);
        }
      }
    },
    [inputValue, setInputValue]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(Number(e.key));
      } else if (e.key.toLowerCase() === "backspace") {
        handleKeyPress("backspace");
      } else if (e.key === ".") {
        handleKeyPress(".");
      }
    },
    [handleKeyPress]
  );

  useEffect(() => {
    // Attach keydown listener for desktop keyboard input
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Clean up event listener on unmount
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <AmountDisplay amount={inputValue} error={error} />
      </div>

      <CustomKeyboard onKeyPress={handleKeyPress} disabled={disabled} />
    </div>
  );
};

export default AmountInput;

type AmountDisplayProps = {
  amount: string;
  error?: TValidatorError;
};

const AmountDisplay: React.FC<AmountDisplayProps> = ({ amount, error }) => {
  return (
    <>
      <div className="text-center text-[48px] leading-[53px] font-montserrat">
        {amount ? (
          <div className="!w-[200px] mx-auto overflow-hidden overflow-x-auto scrollbar-hidden">
            <div className="font-semibold text-black">{amount}</div>
          </div>
        ) : (
          <span className="text-gray-400">0.00</span>
        )}
      </div>

      {error && (
        <SimpleAnimatedComponent>
          <p className="text-danger font-bold text-[12px] text-center">
            {error}
          </p>
        </SimpleAnimatedComponent>
      )}
    </>
  );
};
