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


// export function TaskForm({ getNewTask }){
//   const { title, refreshTitle } = useTaskTitle();

//   const handleClick = (event) => {
//     event.preventDefault();
//     getNewTask(title);
//     refreshTitle('');
//   }

//   const handleInputTask = (event) => {
//     const newTitle = event.target.value;
//     refreshTitle(newTitle);
//   }

//   return(
//     <form onSubmit={handleClick}>
//       <input type='text' placeholder='Ingresar titulo tarea' onChange={handleInputTask} value={title}/>
//       <button type='submit'>Agregar</button>
//     </form>
//   )
// }
