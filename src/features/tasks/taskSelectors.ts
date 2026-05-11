import type { RootState } from "../../store";

export const selectLatestTasks = (
  state: RootState
) => {
  return state.tasks.tasks
    .toSorted(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
};

export const selectTaskStats = (
  state: RootState
) => {
  const tasks = state.tasks.tasks;

  const total = tasks.length;

  const todo = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "in_progress"
  ).length;

  const done = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const getPercent = (value: number) => {
    if (total === 0) return 0;

    return Math.round((value / total) * 100);
  };

  return {
    total,

    todo,
    inProgress,
    done,

    todoPercent: getPercent(todo),
    inProgressPercent: getPercent(inProgress),
    donePercent: getPercent(done),
  };
};