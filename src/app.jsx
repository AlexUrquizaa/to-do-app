import { useTaskList } from "./hooks/useTaskList";
import { ShowTaskList } from "./componentes/ShowTaskList";
import { TaskForm } from "./componentes/TaskForm";
import './app.css';

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
