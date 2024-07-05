import { useContext } from "react";
import { FiltersContext } from "../componentes/compsDeContexto/FilterContext";

export function useFilter(){
  const context = useContext(FiltersContext);
  const { filters, setFilters } = useContext(FiltersContext);

  if(context === undefined) throw new Error('No esta envuelto en su contexto');

  const filterTasks = ( tasks ) => {
    return tasks.filter(task => task.title.toLowerCase().startsWith(filters.toLowerCase()));
  }

  return { filterTasks, setFilters };
}
