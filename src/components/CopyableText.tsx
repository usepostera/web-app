import React from "react";
import toast from "react-hot-toast";
import RippleEffect from "./Ripple";

interface CopyableTextProps {
  text: string;
  previewLength?: number; // Length of the substring to display initially
  className?: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({
  text,
  previewLength = 50,
  className,
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative group">
      {/* Display a short version of the text */}
      <RippleEffect onClick={copyToClipboard} skipDelay>
        <p className={className}>
          {text.length > previewLength
            ? `${text.slice(0, previewLength)}...`
            : text}
        </p>
      </RippleEffect>
    </div>
  );
};

export default CopyableText;
