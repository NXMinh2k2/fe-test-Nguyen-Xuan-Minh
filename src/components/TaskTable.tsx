import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Task } from '../types/tasks';
import dayjs from 'dayjs';

type Status = 'todo' | 'in_progress' | 'done';

type Priority = 'low' | 'medium' | 'high';

const statusColor: Record<Status, string> = {
  todo: 'orange',
  in_progress: 'blue',
  done: 'green',
};

const priorityColor: Record<Priority, string> = {
  low: 'default',
  medium: 'gold',
  high: 'red',
};

const columns: ColumnsType<Task> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },

  {
    title: 'Assignee',
    dataIndex: 'assignee',
    key: 'assignee',
  },

  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',

    render: (status: Status) => (
      <Tag color={statusColor[status]}>
        {status}
      </Tag>
    ),
  },

  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',

    render: (priority: Priority) => (
      <Tag color={priorityColor[priority]}>
        {priority}
      </Tag>
    ),
  },

  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    render: (dueDate: string) => dayjs(dueDate).format('DD/MM/YYYY'),
  },
];

interface Props {
  tasks: Task[];
}

export default function TaskTable({
  tasks,
}: Props) {
  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      pagination={false}
    />
  );
}