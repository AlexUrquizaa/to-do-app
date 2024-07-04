import { useEffect, useRef, useState } from "react";
import { v4 as newTaskID }  from "uuid";
import { render, screen, cleanup, fireEvent, getByRole } from "@testing-library/react";
import { afterEach, describe , it, expect} from "vitest";

function useTaskList(){
  const [tasks, setTasks] = useState([]);

  const addTask = (newTitle) => {
    setTasks(prevState => [
      ...prevState,
      {
        title: newTitle,
        id: newTaskID(),
        isCompleted: false
      }
    ]);
  }

  const updateTask = (id) => {
    const newTasks = tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task);
    setTasks(newTasks);
  }

  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  return { tasks, addTask, updateTask, removeTask }
}

function TaskCard({ item, update, remove }){

  const handleCheck = () => {
    update(item.id);
  }
  
  const deleteTask = () => {
    remove(item.id);
  }

  return(
    <article>
      <input type="checkbox" onChange={handleCheck} checked={item.isCompleted}/>
      <span>{item.title}</span>
      <button onClick={deleteTask}>Eliminar</button>
    </article>    
  )
}

function ShowTaskList({ tasks, update, remove }){
  return (
    tasks.length === 0 ? (<p>No hay tareas disponibles</p>) : 
    (
      tasks.map(task => (
        <TaskCard key={task.id} item={task} update={update} remove={remove}/>
      ))
    )
  )
}

function App(){
  const { tasks, addTask, updateTask, removeTask } = useTaskList();

  const handleSubmit = (title) => {
    addTask(title);
  }

  const handleCheck = (id) => {
    updateTask(id);
  }

  const handleRemove = (id) => {
    removeTask(id);
  }

  return(
    <>
      <h3>To-do app</h3>
      <TaskForm getNewTask={handleSubmit}/>
      <ShowTaskList tasks={tasks} update={handleCheck} remove={handleRemove}/>
    </>
  )
}

function useTaskTitle(){
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  let isFirstInput = useRef(true);

  const refreshTitle = (newTitle) => {
    setTitle(newTitle);
  }

  const validateTitleSubmit = (newTitle) => {
    if(error) return true;

    if(newTitle === ''){
      setError('No enviaste ningun titulo');
      return true;
    }

    if(newTitle.trim().length <= 3){
      setError('El titulo tiene menos de 3 caracteres!');
      return true;
    }

    setError(null);
  }

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = !(title === ''); //Cambiar luego sacando el !.
      return
    }

    if(title.startsWith(' ')){
      setError('El titulo no puede empezar con un espacio vacio');
      return
    }

    const isNumber = title.split('').some(char => '0123456789'.includes(char));
    if(isNumber){
      setError('El titulo no puede contener numeros');
      return
    }

    setError(null);
  }, [title]);

  return { title, refreshTitle, error, validateTitleSubmit};
}

function TaskForm({ getNewTask }){
  const { title, refreshTitle, error, validateTitleSubmit} = useTaskTitle();

  const handleValue = (event) => {
    refreshTitle(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateTitleSubmit(title)) return
    getNewTask(title);
    refreshTitle('');
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleValue} value={title} name='input-add-taskTitle' placeholder="Ingresa el titulo de la tarea"/>
        <button>Agregar</button>
      </form>
      {error && <p>{error}</p>}
    </header>
  )
}

describe('Verificando parametros del titulo', () => {
  afterEach(cleanup);

  it('Deberia verificar que no envie un titulo vacio', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');

    fireEvent.change(input, {target: {value: ''}});
    fireEvent.click(add);

    screen.getByText('No enviaste ningun titulo');
  });

  it('Deberia verificar que el primer caracter no sea un espacio vacio', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: ' a'}});
    screen.getByText('El titulo no puede empezar con un espacio vacio');
  });

  it('Deberia verificar que el titulo no tenga numeros', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'abc1234def'}});
    screen.getByText('El titulo no puede contener numeros');
  });

  it('Deberia tener una cadena de longitud mayor a 3 caracteres', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');

    fireEvent.change(input, {target: {value: 'ho    '}});
    fireEvent.click(add);

    screen.getByText('El titulo tiene menos de 3 caracteres!');
  });

  it('Deberia agregar una tarea correctamente', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');
    
    fireEvent.change(input, {target: {value: 'Tarea numero uno'}});
    fireEvent.click(add);
    fireEvent.change(input, {target: {value: ''}});
    expect(input.value).toBe('');

    screen.getByText('Tarea numero uno');
  });


});

