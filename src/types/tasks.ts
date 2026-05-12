export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  tags?: string[];
}

export interface TaskFilters {
  searchText: string;

  status: Status[];

  priority: Priority | null;

  dateRange: [string, string] | null;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export interface TasksState {
  items: Task[];

  filters: TaskFilters;

  pagination: PaginationState;
}

export type Status = 'todo' | 'in_progress' | 'done';

export type Priority = 'low' | 'medium' | 'high';
