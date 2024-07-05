import { useTaskTitle } from "../hooks/useTaskTitle";
import { useTask } from "../hooks/useTask";

export function TaskForm(){
  const { title, refreshTitle, error, validateTitleSubmit } = useTaskTitle();
  const { addTask } = useTask();

  const handleValue = (event) => {
    refreshTitle(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateTitleSubmit(title)) return
    addTask(title);
    refreshTitle('');
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type='text' id='npt-add' name='npt-task-add' onChange={handleValue} value={title} placeholder="Ingresa el titulo de la tarea"/>
        <button>Agregar</button>
      </form>
      {error && <p>{error}</p>}
    </header>
  )
}
