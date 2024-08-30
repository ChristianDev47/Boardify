import PropTypes from "prop-types";

import { createContext, useState } from "react";
export const ResponsiveNavContext = createContext({
  responsiveNav: true,
});

export function ResponsiveProvider({ children }) {
  const [responsiveNav, setResponsiveNav] = useState(true);

  return (
    <ResponsiveNavContext.Provider
      value={{
        responsiveNav,
        setResponsiveNav,
      }}
    >
      {children}
    </ResponsiveNavContext.Provider>
  );
}

ResponsiveProvider.propTypes = {
  children: PropTypes.node,
};
