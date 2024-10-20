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

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (loading) return;
    setIsSliding(true);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isSliding) return;

    const slider = sliderRef.current;
    if (slider) {
      const sliderWidth = slider.offsetWidth;
      let newPosition;

      // For mobile (touch) or desktop (mouse)
      if ("touches" in e) {
        newPosition =
          e.touches[0].clientX - slider.getBoundingClientRect().left;
      } else {
        newPosition = e.clientX - slider.getBoundingClientRect().left;
      }

      if (newPosition >= sliderWidth * 0.9) {
        setPosition(sliderWidth);
      } else {
        setPosition(Math.max(0, Math.min(newPosition, sliderWidth)));
      }
    }
  };

  const handleEnd = async () => {
    if (!isSliding) return;

    const slider = sliderRef.current;
    if (slider) {
      if (position >= slider.offsetWidth * 0.9) {
        setPosition(slider.offsetWidth);
        setIsSliding(false);
        await onComplete();
      }

      setPosition(0);
    }

    setIsSliding(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleTouchMove = (e: TouchEvent) => handleMove(e);

    if (isSliding) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
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
        onMouseDown={handleStart}
        onTouchStart={handleStart}
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
