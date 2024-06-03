export function TaskCard({ item, update, remove }){

  const handleChecked = () => {
    update(item.id);
  }

  const deleteTask = () => {
    remove(item.id);
  }

  return(
    <article>
      <input type='checkbox' onChange={handleChecked} checked={item.isCompleted}/>
      <span className={item.isCompleted ? 'completed' : ''}>{item.title}</span>
      <button onClick={deleteTask}>Eliminar</button>
    </article>
  )
}
