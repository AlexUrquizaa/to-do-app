import { useTaskList } from "./hooks/useTaskList";
import { ShowTaskList } from "./componentes/ShowTaskList";
import { TaskForm } from "./componentes/TaskForm";
import './app.css';

// Realizar el mismo proyecto hasta este punto pero usando tests.
// Aplicar useContext para el useTaskCard. Asi evito el prop drill. De paso despejo el App.
// Ver que otros hooks aplicar (useReduce, useID, useRef, useMemo/Callback).

function App(){
  const { tasks, addTask, updateTask, removeTask} = useTaskList();

  const handleSubmit = (title) => {
    addTask(title);
  }

  const handleCheck = (id) => {
    updateTask(id);
  }

  const handleRemove = (id) => {
    removeTask(id);
  }

  return (
    <>
      <h3>Crear listado tareas</h3><br/>
      <TaskForm getNewTask={handleSubmit}/>
      <ShowTaskList tasks={tasks} update={handleCheck} remove={handleRemove}/>
    </>
  );
}

export default App;
