export function TaskCard({ item, update, remove }){

  const handleCheck = () => {
    update(item.id);
  }
  
  const deleteTask = () => {
    remove(item.id);
  }

  return(
    <li>
      <input type="checkbox" onChange={handleCheck} checked={item.isCompleted}/>
      <span className={item.isCompleted ? 'completed' : ''}>{item.title}</span>
      <button onClick={deleteTask}>Eliminar</button>
    </li>    
  )
}
