import { useContext } from "react";
import { FiltersContext } from "../componentes/compsDeContexto/FilterContext";

export function useFilter(){
  const context = useContext(FiltersContext);
  if(context === undefined) throw new Error('No esta envuelto en su contexto de Filters');
  return context;
}
