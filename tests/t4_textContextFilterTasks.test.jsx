import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as newTaskID }  from "uuid";
import { render, screen, cleanup, fireEvent, getByRole } from "@testing-library/react";
import { afterEach, describe , it, expect} from "vitest";

const FiltersContext = createContext();
function FiltersProvider({ children }){
  const [ filters, setFilters ] = useState('');
  return(
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  );
}

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
    <>
      <input type="checkbox" onChange={handleCheck} checked={item.isCompleted}/>
      <span className={item.isCompleted ? 'completed' : ''}>{item.title}</span>
      <button onClick={deleteTask}>Eliminar</button>
    </>
  )
}

function ShowTaskList({ tasks, update, remove }){
  return (
    <ul>
      {tasks.length === 0 ? (<p>No hay tareas disponibles</p>) : 
      (
        tasks.map(task => (
          <li key={task.id}>
            <TaskCard key={task.id} item={task} update={update} remove={remove}/>
          </li>
        ))
      )}
    </ul>
  )
}

function useTaskTitle(){
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

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
      isFirstInput.current = !(title === '');
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
        <input type='text' id='npt-add' name='npt-task-add' onChange={handleValue} value={title} placeholder="Ingresa el titulo de la tarea"/>
        <button>Agregar</button>
      </form>
      {error && <p>{error}</p>}
    </header>
  )
}

function App(){
  const { tasks, addTask, updateTask, removeTask } = useTaskList();
  const { filterTasks } = useFilter();

  const handleSubmit = (title) => {
    addTask(title);
  }

  const handleCheck = (id) => {
    updateTask(id);
  }

  const handleRemove = (id) => {
    removeTask(id);
  }

  const filteredTasks = filterTasks(tasks);

  return(
    <>
      <h3>To-do app</h3>
      <TaskFormFilter/>
      <TaskForm getNewTask={handleSubmit}/>
      <ShowTaskList tasks={filteredTasks} update={handleCheck} remove={handleRemove}/>
    </>
  )
}

function TaskFormFilter(){
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
        <input type='text' id='npt-search' name='npt-task-search' onChange={handleFilter} value={title} placeholder='Buscar tarea'/>
        <button>Buscar</button>
      </form>
      {(error && error !== 'El titulo tiene menos de 3 caracteres!') && <p>{error}</p>}
    </header>
  )
}

function useFilter(){
  const context = useContext(FiltersContext);
  const { filters, setFilters } = useContext(FiltersContext);

  if(context === undefined) throw new Error('No esta envuelto en su contexto');

  const filterTasks = ( tasks ) => {
    return tasks.filter(task => task.title.toLowerCase().startsWith(filters.toLowerCase()));
  }

  return { filterTasks, setFilters };
}

describe('Verificando parametros del titulo usando Context Filter', () => {
  afterEach(cleanup);

  it('Debe renderizar correctamente', () => {
    render(
      <FiltersProvider>
        <App/>
      </FiltersProvider>
    );
  });

  it('Deberia verificar que el primer caracter no sea un espacio vacio', () => {
    render(
      <FiltersProvider>
        <App/>
      </FiltersProvider>
    );
    const input = screen.getByPlaceholderText('Buscar tarea');
    fireEvent.change(input, {target: {value: ' a'}});
    screen.getByText('El titulo no puede empezar con un espacio vacio');

    fireEvent.change(input, {target: {value: 'abc1234def'}});
    screen.getByText('El titulo no puede contener numeros');
  });

  it('Deberia mostrar solo las tareas que empiezen en do', () => {
    render(
      <FiltersProvider>
        <App/>
      </FiltersProvider>
    );
    
    const inputAdd = screen.getByPlaceholderText("Ingresa el titulo de la tarea");
    const add = screen.getByText('Agregar');

    fireEvent.change(inputAdd, {target: {value: 'Tarea uno'}});
    fireEvent.click(add);
    fireEvent.change(inputAdd, {target: {value: 'Tarea dos'}});
    fireEvent.click(add);
    fireEvent.change(inputAdd, {target: {value: 'Tarea doos'}});
    fireEvent.click(add);
    fireEvent.change(inputAdd, {target: {value: ''}});
    expect(inputAdd.value).toBe('');

    const inputSearch = screen.getByPlaceholderText('Buscar tarea');
    fireEvent.change(inputSearch, {target: {value: 'Tarea do'}});
    expect(screen.queryByText('Tarea uno')).not;
    screen.getByText('Tarea dos');
    screen.getByText('Tarea doos');
  });

  it('Deberia mostrar un error si envio un titulo vacio', () => {
    render(
      <FiltersProvider>
        <App/>
      </FiltersProvider>
    );

    const inputAdd = screen.getByPlaceholderText('Ingresa el titulo de la tarea');
    const add = screen.getByText('Agregar');

    fireEvent.change(inputAdd, {target: {value: 'Tarea uno'}});
    fireEvent.click(add);
    fireEvent.change(inputAdd, {target: {value: 'Tarea dos'}});
    fireEvent.click(add);
    fireEvent.change(inputAdd, {target: {value: ''}});
    expect(inputAdd.value).toBe('');

    const inputSearch = screen.getByPlaceholderText('Buscar tarea');
    const search = screen.getByText('Buscar');
    fireEvent.change(inputSearch, {target: {value: ''}});
    fireEvent.click(search);
    screen.getByText('No enviaste ningun titulo');
  });
});
