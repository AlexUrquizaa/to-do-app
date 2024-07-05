import { TaskCard } from "./TaskCard"

export function ShowTaskList({ tasks, update, remove }){
  return (
    <ul>
      {tasks.length === 0 ? (<p>No hay tareas disponibles</p>) : 
      (
        tasks.map(task => (
          <TaskCard key={task.id} item={task} update={update} remove={remove}/>
        ))
      )}
    </ul>
  )
}
