import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export const selectLatestTasks = (
  state: RootState
) => {
  return state.tasks.items
    .toSorted(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
};

export const selectAllTasks = (state: RootState) => state.tasks.items;

export const selectTaskStats =
  createSelector(
    [selectAllTasks],

    (tasks) => {
      const total = tasks.length;

      const todo = tasks.filter((task) => task.status === 'todo').length;

      const inProgress = tasks.filter((task) => task.status === 'in_progress').length;

      const done = tasks.filter((task) => task.status === 'done').length;

      const getPercent = (value: number) => {
        if (total === 0) return 0;

        return Math.round(
          (value / total) * 100
        );
      };

      return {
        total,
        todo,
        inProgress,
        done,
        todoPercent:
          getPercent(todo),
        inProgressPercent:
          getPercent(
            inProgress
          ),
        donePercent:
          getPercent(done),
      };
    }
  );

export const selectFilters = (
  state: RootState
) => state.tasks.filters;

export const selectPagination = (
  state: RootState
) => state.tasks.pagination;

export const selectFilteredTasks =
  createSelector(
    [selectAllTasks, selectFilters],

    (tasks, filters) => {
      const {
        searchText,
        status,
        priority,
        dateRange,
      } = filters;

      return tasks.filter((task) => {
        const matchSearch =
          task.title
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            );

        const matchStatus =
          !status.length ||
          status.includes(task.status);

        const matchPriority =
          !priority ||
          task.priority === priority;

        const matchDate =
          !dateRange ||
          (() => {
            if (!task.dueDate)
              return false;

            const due =
              new Date(
                task.dueDate
              ).getTime();

            const start =
              new Date(
                dateRange[0]
              ).getTime();

            const end =
              new Date(
                dateRange[1]
              ).getTime();

            return (
              due >= start &&
              due <= end
            );
          })();

        return (
          matchSearch &&
          matchStatus &&
          matchPriority &&
          matchDate
        );
      });
    }
  );

export const selectPaginatedTasks =
  createSelector(
    [
      selectFilteredTasks,
      selectPagination,
    ],

    (tasks, pagination) => {
      const {
        currentPage,
        pageSize,
      } = pagination;

      const start =
        (currentPage - 1) *
        pageSize;

      const end = start + pageSize;

      return tasks.slice(start, end);
    }
  );
