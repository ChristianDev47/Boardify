import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    withoutMembers: false,
    selectedMembers: {  data: [] },
    withoutDate: false,
    due_this_week: false,
    due: false,
    completed: false,
    not_completed: false,
    selectedLists: { data: [] }
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node,
};
