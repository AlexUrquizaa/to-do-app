import { useEffect, useState } from "react";
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

function useTaskTitle(){
  const [title, setTitle] = useState('');

  const refreshTitle = (newTitle) => {
    setTitle(newTitle);
  }
  
  return { title, refreshTitle }
}

function TaskForm({ getNewTask }){
  const { title, refreshTitle } = useTaskTitle();

  const handleValue = (event) => {
    const newTitle = event.target.value;
    refreshTitle(newTitle);
  }

  const handleClick = (event) => {
    event.preventDefault();
    getNewTask(title);
    refreshTitle('');
  }

  return (
    <form onSubmit={handleClick}>
      <input type='text' onChange={handleValue} value={title} placeholder="Ingresa el titulo de la tarea"/>
      <button>Agregar</button>
    </form>
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

describe('Crear tarea', () => {
  afterEach(cleanup);

  it('Titulo correctamente renderizado', () => {
    render(<App />);
    screen.getByText('To-do app');
  });

  it('Deberia haber un formulario para agregar tarea', () => {
    render(<App />);
    screen.getByPlaceholderText('Ingresa el titulo de la tarea');
    screen.getByRole('button');
  });

  it('Deberia el input tomar el valor del estado', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'Tarea numero uno'}});
    expect(input.value).toBe('Tarea numero uno');
  });

  it('Deberia vaciar el input al agregar un titulo', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');
    
    fireEvent.change(input, {target: {value: 'Tarea numero dos'}});

    fireEvent.click(add);
    fireEvent.change(input, {target: {value: ''}});
    expect(input.value).toBe('');
  });
  
  it('Deberia agregar un par de tareas en la lista', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');
    
    fireEvent.change(input, {target: {value: 'Tarea numero uno'}});
    fireEvent.click(add);
    fireEvent.change(input, {target: {value: ''}});
    expect(input.value).toBe('');

    fireEvent.change(input, {target: {value: 'Tarea numero dos'}});
    fireEvent.click(add);
    fireEvent.change(input, {target: {value: ''}});
    expect(input.value).toBe('');

    screen.getByText('Tarea numero uno');
    screen.getByText('Tarea numero dos');
  });
});

describe('Interactuar con la tarea', () => {
  afterEach(cleanup);
  
  it('Deberia cambiar el checkbox al clickear', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');
    
    fireEvent.change(input, {target: {value: 'Tarea numero uno'}});
    fireEvent.click(add);
    fireEvent.change(input, {target: {value: ''}});
    expect(input.value).toBe('');

    screen.getByText('Tarea numero uno');

    const inputCheck = screen.getByRole('checkbox');
    fireEvent.change(inputCheck, {target: {checked: true}});
    fireEvent.change(inputCheck, {target: {checked: false}});
    fireEvent.change(inputCheck, {target: {checked: true}});
  });


  
  it('Deberia eliminar la tarea', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const add = screen.getByText('Agregar');
    
    fireEvent.change(input, {target: {value: 'Tarea numero uno'}});
    fireEvent.click(add);
    fireEvent.change(input, {target: {value: ''}});
    expect(input.value).toBe('');

    screen.getByText('Tarea numero uno');

    const buttonDelete = screen.getByText('Eliminar');
    fireEvent.click(buttonDelete);

    // screen.getByText('Tarea numero uno'); //Demuestra que no existe mas la tarea.
  });
});

