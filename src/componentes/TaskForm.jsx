import { useTaskTitle } from "../hooks/useTaskTitle";

export function TaskForm({ getNewTask }){
  const { title, refreshTitle } = useTaskTitle();

  const handleClick = (event) => {
    event.preventDefault();
    getNewTask(title);
    refreshTitle('');
  }

  const handleInputTask = (event) => {
    const newTitle = event.target.value;
    refreshTitle(newTitle);
  }

  return(
    <form onSubmit={handleClick}>
      <input type='text' placeholder='Ingresar titulo tarea' onChange={handleInputTask} value={title}/>
      <button type='submit'>Agregar</button>
    </form>
  )
}
