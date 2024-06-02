import { useState } from "react";
import { v4 as newTaskID }  from "uuid";
import './app.css';

function App(){
  const [title, setTitle] = useState('');
  const [tasks, setTask] = useState([]);

  const handleInputTask = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  const handleClick = (event) => {
    event.preventDefault();

    setTask(prevState => ([
      ...prevState,
      {
        title: title, 
        id: newTaskID(), 
        isCompleted: false
      }
    ]));
  }

  const handleChecked = (task) => {
    const updateTask = {...task, isCompleted: !task.isCompleted};
    setTask(prevState => prevState.map(item => item.id === task.id ? updateTask : item));
  }

  const deleteTask = (task) => {
    setTask(prevState => prevState.filter(item => item.id !== task.id));
  }

  return (
    <>
      <h3>Crear listado tareas</h3>

      <form onSubmit={handleClick}>
        <input type='text' placeholder='Ingresar titulo tarea' onChange={handleInputTask} value={title}/>
        <button type='submit'>Agregar</button>
      </form>

      { tasks.length === 0 ? (<p>No hay tareas disponibles</p>) : 
        (
          tasks.map(task => (
            <article key={task.id}>
              <input type='checkbox' onChange={() => handleChecked(task)} checked={task.isCompleted}/>
              <span className={task.isCompleted ? "completed" : ""}>{task.title}</span>
              <button onClick={() => deleteTask(task)}>Eliminar</button>
            </article>
          ))
        )
      }
    </>
  );
}

export default App;
