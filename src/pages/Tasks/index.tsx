import { useSelector } from "react-redux";
import TaskTable from "../../components/TaskTable";
import { selectFilteredTasks } from "../../features/tasks/taskSelectors";

export default function Tasks() {
  const tasks = useSelector(selectFilteredTasks);
  

  return (
    <TaskTable tasks={tasks} />
  );
}