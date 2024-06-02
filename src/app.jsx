import { useState } from "react";
import './app.css';

function App(){
  const [title, setTitle] = useState('');

  // Asigno valores al value del input. Ya tengo un titulo de tarea.
  const handleInputTask = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    // Actualizar aqui la lista?
  }

  return (
    <>

      <form onSubmit={handleClick}>
        <input type='text' placeholder='Ingresar titulo tarea' onChange={handleInputTask} value={title}/>
        <button type='submit'>Agregar</button>
      </form>

      <article>
        <input type='checkbox'/>
        <span>Titulo tarea numero uno</span>
        <button>Eliminar</button>
      </article>

    </>
  );
}

export default App;
