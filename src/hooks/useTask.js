import { useContext } from "react";
import { TasksContext } from "../componentes/compsDeContexto/TasksContext";

export function useTask(){
  const context = useContext(TasksContext);
  if(context === undefined) throw new Error('No esta envuelto en su contexto de Tasks');
  return context;
}
