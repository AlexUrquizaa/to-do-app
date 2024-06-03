import { useState } from "react";
import { v4 as newTaskID }  from "uuid";

export function useTaskList(){
  const [tasks, setTask] = useState([]);

  const addTask = (title) => {
    setTask(prevState => ([
      ...prevState,
      {
        title: title, 
        id: newTaskID(), 
        isCompleted: false
      }
    ]));
  }

  const updateTask = (id) => {
    const newTasks = tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task);
    setTask(newTasks);
  }

  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTask(newTasks);
  }

  return { tasks, addTask, updateTask, removeTask };
}
