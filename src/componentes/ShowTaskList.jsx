import { TaskCard } from "./TaskCard"
import { useFilter } from "../hooks/useFilter";
import { useTask } from "../hooks/useTaskList";

export function ShowTaskList(){
  const { filterTasks } = useFilter();
  const { tasks } = useTask();

  const filteredTasks = filterTasks(tasks);
  
  return (
    <ul>
      {filteredTasks.length === 0 ? (<p>No hay tareas disponibles</p>) : 
      (
        filteredTasks.map(task => (
          <li key={task.id}>
            <TaskCard item={task}/>
          </li>
        ))
      )}
    </ul>
  )
}
