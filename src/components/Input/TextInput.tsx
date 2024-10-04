import React, { InputHTMLAttributes } from "react";
import { TValidatorError } from "../../types";

type Props = {
  label?: string;
  error?: TValidatorError | null;
  isViewOnly?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export const TextInput: React.FC<Props> = ({
  label,
  multiple,
  error = null,
  isViewOnly = false,
  ...textInputProps
}) => {
  return (
    <div>
      {label && (
        <label
          className="text-[14px] leading-[17.5px] font-normal block mb-2"
          htmlFor={textInputProps.id}
        >
          {label}
        </label>
      )}
      {multiple && !isViewOnly && (
        <textarea
          className="w-full py-[19px] px-[16px] bg-[#F8FAFC] rounded-[20px] border-[1px] border-[#F1F5F9] text-[12px] text-[#000000] outline-none"
          {...textInputProps}
          rows={5}
        />
      )}
      {!multiple && !isViewOnly && (
        <input
          className="w-full py-[8px] px-[12px] rounded-[6px] border-[1px] bg-transparent border-[#000000] text-[14px] leading-[17.01px] text-[#000000] outline-none"
          {...textInputProps}
          autoComplete="off"
        />
      )}
      {isViewOnly && (
        <p className="text-[#334155] text-[16px] leading-[20px]">
          {textInputProps.value ?? "-"}
        </p>
      )}
      {error && (
        <p className="text-danger text-[12px] font-semibold leading-[15px] my-2">
          {typeof error === "string" && error}
        </p>
      )}
    </div>
  );
};
