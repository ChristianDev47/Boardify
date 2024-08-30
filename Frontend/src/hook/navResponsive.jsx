import { useContext } from "react";
import { ResponsiveNavContext } from "../context/responsiveNavbar";

export const useResponsiveNav = () => {
  const context = useContext(ResponsiveNavContext);

  if (context === undefined) {
    throw new Error(
      "useResponsiveNav must be used within a ResponsiveNavContext"
    );
  }

  return context;
};
