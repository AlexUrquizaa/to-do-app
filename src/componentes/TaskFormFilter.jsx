import { useTaskTitle } from "../hooks/useTaskTitle";

export function TaskFormFilter({ getNewTaskTitle }){
  const { title, refreshTitle, error } = useTaskTitle();

  const handleFilter = (event) => {
    const value = event.target.value;
    refreshTitle(value);
    getNewTaskTitle(value);
  }

  const handleErrorClassName = error ? 'tooltip show-tooltip' : 'tooltip';

  return(
    <header className="contentError">
      <form>
        <input type='text' onChange={handleFilter} value={title} placeholder='Buscar tarea'/>
      </form>
      <span className={handleErrorClassName}>{error}</span>
    </header>
  )
}
