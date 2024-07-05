import { useState, createContext } from "react";

export const TasksContext = createContext();
export function TasksProvider({ children }){
  const [ tasks, setTasks ] = useState([]);
  return (
    <TasksContext.Provider value={{
      tasks, setTasks
    }}>
      {children}
    </TasksContext.Provider>
  )
}
