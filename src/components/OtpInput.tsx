import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { AppBottomSheetWrapper } from "./AppBottomSheet";
import Inputs from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  message: string;
  onSubmit: (code: string) => void;
  loading?: boolean;
};

const OtpInput: React.FC<Props> = (props) => {
  const { message, onSubmit, isOpen, loading = false } = props;

  const [code, setCode] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (loading) {
        return;
      }

      if (code.length !== 6) {
        toast.error("Invalid otp length");
      } else {
        onSubmit(code);
      }
    },
    [code, loading, onSubmit]
  );

  useEffect(() => {
    if (!isOpen) {
      setCode("");
    }
  }, [isOpen]);

  return (
    <AppBottomSheetWrapper isOpen={isOpen} onClose={() => onSubmit("")}>
      <form
        className="flex flex-col items-start font-montserrat md:max-w-[380px] mx-auto gap-2"
        onSubmit={handleSubmit}
      >
        <h3 className="self-start font-medium text-[20px] leading-[24px] mb-4">
          Otp
        </h3>

        <p className="text-[16px] leading-[20px] mb-2">{message}</p>

        <div className="mb-2 w-full">
          <Inputs.TextV2
            placeholder="012345"
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="w-fit ml-auto">
          <Button.Contained label="Submit" type="submit" loading={loading} />
        </div>
      </form>
    </AppBottomSheetWrapper>
  );
};

export default OtpInput;
