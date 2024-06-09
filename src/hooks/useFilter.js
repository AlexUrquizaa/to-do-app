import { useState, useEffect } from "react";

export function useFilter({ tasks }){
  const [ filter, setFilter ] = useState('');
  const [ taskList, setTasks ] = useState([]);

  const filterTaskList = () => {
    const newList = tasks.filter(task => task.title.toLowerCase().startsWith(filter.toLowerCase()));
    setTasks(newList);
  }

  useEffect(filterTaskList, [tasks, filter]);

  return { setFilter, taskList };
}
