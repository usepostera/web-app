import { useState, useEffect } from "react";

// Custom Hook to detect if user is on mobile
function useDeviceView() {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if the viewport width is mobile size
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust 768px as per your design breakpoint for mobile
  };

  useEffect(() => {
    // Check on mount
    checkIsMobile();

    // Add a listener for window resize to update on change
    window.addEventListener("resize", checkIsMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

export default useDeviceView;
