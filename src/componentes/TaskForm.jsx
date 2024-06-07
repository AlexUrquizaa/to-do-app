import { useTaskTitle } from "../hooks/useTaskTitle";

export function TaskForm({ getNewTask }){
  const { title, refreshTitle, error} = useTaskTitle();

  const handleValue = (event) => {
    refreshTitle(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(error) return
    getNewTask(title);
    refreshTitle('');
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleValue} value={title} name='input-add-taskTitle' placeholder="Ingresa el titulo de la tarea"/>
        <button>Agregar</button>
      </form>
      {error && <p color="red">{error}</p>}
    </header>
  )
}