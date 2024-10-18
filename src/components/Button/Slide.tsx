import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GlobalButtonProps } from "../../@types";

type Props = {
  onComplete: () => Promise<void> | void;
} & GlobalButtonProps;

const SlideButton: React.FC<Props> = ({ onComplete, label, loading }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [position, setPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    console.log("start sliding");
    setIsSliding(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding) return;

    const slider = sliderRef.current;
    if (slider) {
      const sliderWidth = slider.offsetWidth;
      const newPosition = e.clientX - slider.getBoundingClientRect().left;

      // Check if the position exceeds 90% of the slider width
      if (newPosition >= sliderWidth * 0.9) {
        setPosition(sliderWidth); // Snap to 100% (the sliderWidth)
      } else {
        setPosition(Math.max(0, Math.min(newPosition, sliderWidth))); // Normal dragging behavior
      }
    }
  };

  const handleMouseUp = async () => {
    if (!isSliding) return;

    const slider = sliderRef.current;
    if (slider) {
      // If the position is greater than 90%, snap to 100% and complete the action
      if (position >= slider.offsetWidth * 0.9) {
        setPosition(slider.offsetWidth); // Snap to 100%
        await onComplete();
      }

      setPosition(0); // Reset the slider if not past 90%
    }

    setIsSliding(false);
  };

  useEffect(() => {
    if (isSliding) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSliding, position]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[40px] bg-gray-200 rounded-[6px] overflow-hidden select-none"
    >
      <div
        className={classNames(
          "z-10 absolute top-0 left-0 h-full bg-primary rounded-[6px] flex items-center justify-center text-white text-lg font-semibold",
          {
            "transition-all duration-200 ease-in-out": !isSliding,
            "w-full": position >= (sliderRef.current?.offsetWidth ?? 0) * 0.9, // Full width when completed
            "w-[50px]": position < (sliderRef.current?.offsetWidth ?? 0) * 0.9, // Start small
          }
        )}
        style={{ width: `${Math.max(50, position)}px` }}
        onMouseDown={handleMouseDown}
      >
        {loading ? (
          <div className="loader mr-2"></div>
        ) : (
          <FaLongArrowAltRight />
        )}
      </div>

      <span
        className={classNames(
          "absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-600 py-[13px] px-[12px]",
          {
            "opacity-0":
              isSliding ||
              position >= (sliderRef.current?.offsetWidth ?? 0) * 0.9,
            "opacity-100": !isSliding && position === 0,
          }
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default SlideButton;
