import { useContext } from "react";
// import { FiltersContext } from "../componentes/compsDeContexto/FilterContext";
import { FiltersContext } from "../componentes/compsDeContexto/FilterContext";

export function useFilter(){
  const { filters, setFilters } = useContext(FiltersContext);

  const filterTasks = ( tasks ) => {
    return tasks.filter(task => task.title.toLowerCase().startsWith(filters.toLowerCase()));
  }

  return { filterTasks, setFilters };
}
