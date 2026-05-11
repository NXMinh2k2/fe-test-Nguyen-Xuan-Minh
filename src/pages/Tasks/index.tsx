import { useSelector } from "react-redux";
import TaskTable from "../../components/TaskTable";
import { selectAllTasks } from "../../features/tasks/taskSelectors";

export default function Tasks() {
  const allTasks = useSelector(selectAllTasks);

  return (
    <TaskTable tasks={allTasks} />
  );
}