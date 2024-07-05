import { useContext } from "react";
import { TasksContext } from "../componentes/compsDeContexto/TasksContext";
import { v4 as newTaskID }  from "uuid";

export function useTask(){
  const context = useContext(TasksContext);
  const { tasks, setTasks } = useContext(TasksContext);

  if(context === undefined) throw new Error('No esta envuelto en su contexto de Tasks');

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

  return { addTask, updateTask, removeTask, tasks };
}
