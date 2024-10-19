import React from "react";
import RippleEffect from "./Ripple";

export type TCustomInputKey = number | "backspace" | ".";

type Props = {
  onKeyPress: (value: TCustomInputKey) => void;
  disabled: boolean;
};

const CustomKeyboard: React.FC<Props> = ({ onKeyPress, disabled }) => {
  const handleButtonClick = (value: TCustomInputKey) => {
    onKeyPress(value);
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0] as TCustomInputKey[]).map((num) => (
        <RippleEffect
          key={num}
          skipDelay
          onClick={() => handleButtonClick(num)}
          disabled={disabled}
          className="flex items-center justify-center text-black font-bold p-2 rounded-full h-auto text-xl w-full"
        >
          {num}
        </RippleEffect>
      ))}
      <RippleEffect
        skipDelay
        disabled={disabled}
        onClick={() => handleButtonClick("backspace")}
        className="flex items-center justify-center text-black font-bold p-2 rounded-full h-auto text-xl w-full"
      >
        ⌫
      </RippleEffect>
    </div>
  );
};

export default CustomKeyboard;
