import { createSlice } from "@reduxjs/toolkit";
import type { TasksState } from "../../types/tasks";
import { mockTasks } from "./mockTask";

const initialState: TasksState = {
  items: mockTasks,
  filters: {
    searchText: '',
    status: [],
    priority: null,
    dateRange: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.unshift(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter(
        (task) => task.id !== action.payload
      );
    },

    deleteManyTasks: (state, action) => {
      state.items = state.items.filter(
        (task) =>
          !action.payload.includes(task.id)
      );
    },

    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;

      const task = state.items.find(
        (task) => task.id === id
      );

      if (task) task.status = status;
    },

    setFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      state.pagination.currentPage = 1;
    },

    resetFilters: (state) => {
      state.filters = {
        searchText: '',

        status: [],

        priority: null,

        dateRange: null,
      };
    },

    setPage: (state, action) => {
      state.pagination.currentPage =
        action.payload;
    },
  },

});

export default taskSlice.reducer;

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  updateTaskStatus,
  setFilter,
  resetFilters,
  setPage
} = taskSlice.actions;