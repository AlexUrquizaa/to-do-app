import { useTaskList } from "./hooks/useTaskList";
import { ShowTaskList } from "./componentes/ShowTaskList";
import { TaskForm } from "./componentes/TaskForm";
import { useFilter } from "./hooks/useFilter";
import './app.css';
import { TaskFormFilter } from "./componentes/TaskFormFilter";

export function App(){
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

export default App;
