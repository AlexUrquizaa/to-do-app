import { useState, createContext } from "react";

export const FiltersContext = createContext();
export function FiltersProvider({ children }){
  const [ filters, setFilters ] = useState('');

  const filterTasks = ( tasks ) => {
    return tasks.filter(task => task.title.toLowerCase().startsWith(filters.toLowerCase()));
  }

  return(
    <FiltersContext.Provider value={{
      filters,
      setFilters,
      filterTasks
    }}>
      {children}
    </FiltersContext.Provider>
  );
}
