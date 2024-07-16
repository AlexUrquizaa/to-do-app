import { useReducer, createContext } from "react";
import { functionReducer, taskInitialState } from "../compsDeReducer/taskReducer";

export const TasksContext = createContext();
export function useTaskReducer(){
  const [state, dispatch] = useReducer(functionReducer, taskInitialState);

  const addTask = task => dispatch({
    type: 'ADD_TO_LIST',
    payload: task
  });

  const removeTask = task => dispatch({
    type: 'REMOVE_FROM_LIST',
    payload: task
  })

  const updateTask = task => dispatch({
    type: 'UPDATE_TO_TASK',
    payload: task
  })

  return { state, addTask, removeTask, updateTask }
}

export function TasksProvider({ children }){
  const { state, addTask, removeTask, updateTask } = useTaskReducer();
  return (
    <TasksContext.Provider value={{
      tasks: state, 
      addTask, 
      removeTask, 
      updateTask
    }}>
      {children}
    </TasksContext.Provider>
  )
}