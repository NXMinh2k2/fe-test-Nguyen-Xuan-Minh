import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types/tasks";
import { mockTasks } from "./mockTask";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: mockTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    deleteMultipleTasks: (state, action ) => {
      state.tasks = state.tasks.filter(
        (task) =>
          !action.payload.includes(task.id)
      );
    },
  },
});

export default taskSlice.reducer;

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteMultipleTasks,
} = taskSlice.actions;