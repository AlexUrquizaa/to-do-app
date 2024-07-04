import { useState, createContext } from "react";

export const FiltersContext = createContext();
export function FiltersProvider({ children }){
  const [ filters, setFilters ] = useState('');
  return(
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  );
}
