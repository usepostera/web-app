import React, { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
  className?: string;
};

export const AppBottomSheetWrapper: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
  className,
}) => {
  return (
    <div
      className={`z-[60] bg-[#0B0B0F66] transition-opacity duration-300 backdrop-blur-sm fixed top-0 left-0 w-full h-full flex flex-col justify-end md:!justify-center items-center ${
        isOpen
          ? "opacity-[1] pointer-events-auto"
          : "opacity-[0] pointer-events-none delay-300"
      } ${className}`}
      onClick={onClose}
    >
      <div
        className={`max-h-[70%] py-14 px-8 rounded-t-[40px] md:rounded-b-[40px] w-full md:!w-fit bg-white transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
