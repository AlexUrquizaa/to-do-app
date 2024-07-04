import { useTaskTitle } from "../hooks/useTaskTitle";
import { useFilter } from "../hooks/useFilter";

export function TaskFormFilter(){
  const { title, refreshTitle, error } = useTaskTitle();
  const { setFilters } = useFilter();

  const handleFilter = (event) => {
    const value = event.target.value;
    refreshTitle(value);
    setFilters(value);
  }

  return(
    <header>
      <form>
        <input type='text' onChange={handleFilter} value={title} placeholder='Buscar tarea'/>
      </form>
      {error && <p>{error}</p>}
    </header>
  )
}
