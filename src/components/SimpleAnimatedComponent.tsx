import { useState, useEffect, ReactNode } from "react";

function SimpleAnimatedComponent({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div
      className={`transform transition-all duration-500 ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default SimpleAnimatedComponent;
