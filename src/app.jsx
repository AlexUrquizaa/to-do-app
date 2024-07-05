import { FiltersProvider } from "./componentes/compsDeContexto/FilterContext";
import { TaskFormFilter } from "./componentes/TaskFormFilter";
import { TasksProvider } from "./componentes/compsDeContexto/TasksContext";
import { TaskForm } from "./componentes/TaskForm";
import { ShowTaskList } from "./componentes/ShowTaskList";
import './app.css';

export function App(){
  return(
    <FiltersProvider>
      <h3>To-do app</h3>
      <TaskFormFilter/>
      <TasksProvider>
        <TaskForm/>
        <ShowTaskList/>
      </TasksProvider>
    </FiltersProvider>
  )
}

export default App;
