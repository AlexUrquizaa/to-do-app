import { useState, createContext } from "react";
import { v4 as newTaskID }  from "uuid";

export const TasksContext = createContext();
export function TasksProvider({ children }){
  const [ tasks, setTasks ] = useState([]);

  const addTask = (newTitle) => {
    setTasks(prevState => [
      ...prevState,
      {
        title: newTitle,
        id: newTaskID(),
        isCompleted: false
      }
    ]);
  }

  const updateTask = (id) => {
    const newTasks = tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task);
    setTasks(newTasks);
  }

  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <TasksContext.Provider value={{
      tasks, setTasks, addTask, updateTask, removeTask
    }}>
      {children}
    </TasksContext.Provider>
  )
}