import { useTaskList } from "./hooks/useTaskList";
import { ShowTaskList } from "./componentes/ShowTaskList";
import { TaskForm } from "./componentes/TaskForm";
import { useFilter } from "./hooks/useFilter";
import './app.css';
import { TaskFormFilter } from "./componentes/TaskFormFilter";

function App(){
  const { tasks, addTask, updateTask, removeTask } = useTaskList();
  const { setFilter, taskList} = useFilter({ tasks });

  const handleSubmit = (title) => {
    addTask(title);
  }

  const handleCheck = (id) => {
    updateTask(id);
  }

  const handleRemove = (id) => {
    removeTask(id);
  }

  const handleFilter = (filterIs) => {
    setFilter(filterIs);
  }

  return(
    <>
      <h3>To-do app</h3>
      <TaskFormFilter getNewTaskTitle={handleFilter}/>
      <TaskForm getNewTask={handleSubmit}/>
      <ShowTaskList tasks={taskList} update={handleCheck} remove={handleRemove}/>
    </>
  )
}

export default App;
