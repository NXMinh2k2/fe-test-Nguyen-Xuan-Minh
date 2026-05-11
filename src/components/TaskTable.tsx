import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Priority, Status, Task } from '../types/tasks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { priorityColorMap, priorityOrder, statusColorMap } from '../utils/task';
interface Props {
  tasks: Task[];
}

export default function TaskTable({
  tasks,
}: Props) {
  
const columns: ColumnsType<Task> = [
  {
  title: "STT",
  key: "index",
    width: 80,
  render: (_, __, index) =>
    (currentPage - 1) * pageSize + index + 1,
},
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
      width: 250,
    sorter: (a, b) =>
    a.title.localeCompare(b.title),
  },
  
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 180,
    render: (status: Status) => (
      <Tag color={statusColorMap[status]}>
        {status}
      </Tag>
    ),
  },

  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 150,
    sorter: (a, b) =>
      priorityOrder[a.priority] -
      priorityOrder[b.priority],
    render: (priority: Priority) => (
      <Tag color={priorityColorMap[priority]}>
        {priority}
      </Tag>
    ),
  },

  {
    title: 'Assignee',
    dataIndex: 'assignee',
    key: 'assignee',
    width: 150,
  },

  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: 150,
    sorter: (a, b) =>
      new Date(a.dueDate || "").getTime() -
      new Date(b.dueDate || "").getTime(),
    render: (dueDate: string) => dayjs(dueDate).format('DD/MM/YYYY'),
  },

   {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 250,
  },

    {
    title: 'Actions',
    dataIndex: 'id',
    key: 'id',
    width: 150,
    render: () => (
      <></>
    ),
  },
];

const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;

  return (
    <>
      <Table
        showSorterTooltip={{
          title: "Sắp xếp",
        }}
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={{
          showTotal: (total) => `Tổng ${total} tasks`,
          current: currentPage,
          pageSize,
          onChange: (page) =>
            setCurrentPage(page),
        }}
      />
    
    </>
  );
}