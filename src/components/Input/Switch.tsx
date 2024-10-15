import React from "react";

type Props = {
  isOn?: boolean;
  onToggle?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
};

export const SwitchInput: React.FC<Props> = (props) => {
  const { isOn = false, onToggle, disabled = false, label } = props;

  const handleToggle = () => {
    if (disabled) return;
    onToggle?.(!isOn);
  };

  return (
    <div className="flex items-center space-x-2">
      {label && <span className="text-gray-700">{label}</span>}
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 ring-[#228B224d]
        ${isOn ? "bg-[#228B22]" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        title="switch button"
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow transition-transform
          ${isOn ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};
