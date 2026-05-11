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
  reducers: {},
});

export default taskSlice.reducer;