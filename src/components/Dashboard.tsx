import { Card, Progress, Statistic } from "antd";
import { useSelector } from "react-redux";
import { selectLatestTasks, selectTaskStats } from "../features/tasks/taskSelectors";
import TaskTable from "./TaskTable";

const Dashborad = () => {

  const lastest5Task = useSelector(selectLatestTasks)
  const stats = useSelector(selectTaskStats);

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card>
        <Statistic
          title="Total Tasks"
          value={stats.total}
        />
      </Card>

      <Card>
        <Statistic
          title="Todo"
          value={stats.todo}
        />
        <Progress  percent={stats.todoPercent} />
      </Card>

      <Card>
        <Statistic
          title="In Progress"
          value={stats.inProgress}
        />
        <Progress  percent={stats.inProgressPercent} />
      </Card>

      <Card>
        <Statistic
          title="Done"
          value={stats.done}
        />
        <Progress  percent={stats.donePercent} />

      </Card>

      <Card title="Latest 5 Tasks">
         <TaskTable tasks={lastest5Task} />
      </Card>
    </div>
  );
};

export default Dashborad;