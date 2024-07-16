import { useTask } from "../hooks/useTask";

export function TaskCard({ item }){
  const { updateTask, removeTask } = useTask();

  const handleCheck = () => {
    updateTask(item);
  }
  
  const deleteTask = () => {
    removeTask(item);
  }

  return(
    <>
      <input type="checkbox" onChange={handleCheck} checked={item.isCompleted}/>
      <span className={item.isCompleted ? 'completed' : ''}>{item.title}</span>
      <button onClick={deleteTask}>Eliminar</button>
    </>
  )
}
