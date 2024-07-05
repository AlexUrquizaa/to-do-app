import { useTaskTitle } from "../hooks/useTaskTitle";
import { useFilter } from "../hooks/useFilter";

export function TaskFormFilter(){
  const { title, refreshTitle, error, validateTitleSubmit } = useTaskTitle();
  const { setFilters } = useFilter();

  const handleFilter = (event) => {
    const value = event.target.value;
    refreshTitle(value);
    setFilters(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateTitleSubmit(title)) return
    setFilters(title);
  }

  return(
    <header>
      <form onSubmit={handleSubmit}>
        <input type='text'  id='npt-search' name='npt-task-search' onChange={handleFilter} value={title} placeholder='Buscar tarea'/>
        <button>Buscar</button>
      </form>
      {(error && error !== 'El titulo tiene menos de 3 caracteres!') && <p>{error}</p>}
    </header>
  )
}
