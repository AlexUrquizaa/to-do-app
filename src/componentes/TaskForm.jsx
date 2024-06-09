import { useTaskTitle } from "../hooks/useTaskTitle";

export function TaskForm({ getNewTask }){
  const { title, refreshTitle, error, validateTitleSubmit} = useTaskTitle();

  const handleValue = (event) => {
    refreshTitle(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(error) return
    if(validateTitleSubmit(title)) return
    getNewTask(title);
    refreshTitle('');
  }

  const handleErrorClassName = error ? 'tooltip show-tooltip' : 'tooltip';

  return (
    <header className="contentError">
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleValue} value={title} name='input-add-taskTitle' placeholder="Ingresa el titulo de la tarea"/>
        <button>Agregar</button>
      </form>
      <span className={handleErrorClassName}>{error}</span>
    </header>
  )
}
