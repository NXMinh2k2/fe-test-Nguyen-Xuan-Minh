import { Button, Form, Popconfirm, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Priority, Status, Task } from '../types/tasks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { priorityColorMap, priorityOrder, } from '../utils/task';
import { useDispatch } from 'react-redux';
import { addTask, deleteMultipleTasks, deleteTask, updateTask } from '../features/tasks/taskSlice';
import TaskModal from './TaskModal';
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
    width: 150,
    render: (status: Status, record: Task) => (
     <Select
        value={status}
        style={{ width: 120 }}
        onChange={(value) =>
          handleStatusChange(
            record,
            value
          )
        }
      options={[
        {
          value: 'todo',
          label: (
            <Tag color="default">
              Todo
            </Tag>
          ),
        },

        {
          value: 'in_progress',
          label: (
            <Tag color="processing">
              In Progress
            </Tag>
          ),
        },

        {
          value: 'done',
          label: (
            <Tag color="success">
              Done
            </Tag>
          ),
        },
      ]}
    />
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
  key: 'actions',
  width: 220,

  render: (_, record) => (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          setEditingTask(record);

          form.setFieldsValue({
            ...record,

            dueDate: record.dueDate
              ? dayjs(record.dueDate)
              : undefined,
          });

          setOpen(true);
        }}
      >
        Edit
      </Button>

      <Popconfirm
        title="Delete this task?"
        onConfirm={() =>
          dispatch(deleteTask(record.id))
        }
      >
        <Button danger  type="primary">
          Delete
        </Button>
      </Popconfirm>
    </Space>
  ),
}
  
];

const [currentPage, setCurrentPage] = useState(1);
const [editingTask, setEditingTask] = useState<Task | null>(null);
const [open, setOpen] = useState(false);
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

const pageSize = 10;
const [form] = Form.useForm();
const dispatch = useDispatch();

const handleSubmit = (values: Task) => {
  setOpen(false);
  if (editingTask) {
    dispatch(
      updateTask({
        ...editingTask,
        ...values,
      })
    );
  form.resetFields();
} else {
  dispatch(addTask({
    ...values,
    id: crypto.randomUUID(),
  }));
  form.resetFields();
  }
}

const handleStatusChange = (
  task: Task,
  status: Status
) => {
  dispatch(
    updateTask({
      ...task,
      status,
    })
  );
};

  return (
    <>
      <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl m-0">
    Task Management
  </h2>

  <Space>
    <Button
      type="primary"
      onClick={() => {
        setEditingTask(null);

        form.resetFields();

        setOpen(true);
      }}
    >
      Add Task
    </Button>

    <Button
      danger
      type="primary"
      disabled={!selectedRowKeys.length}
      onClick={() => {
        dispatch(
          deleteMultipleTasks(selectedRowKeys as string[])
        );

        setSelectedRowKeys([]);
      }}
    >
      Delete Selected
    </Button>
  </Space>
</div>

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
        rowSelection={{
          selectedRowKeys,

          onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
          },
        }}
      />

    <TaskModal
      open={open}
      form={form}
      onCancel={() => {
        setOpen(false);
        setEditingTask(null);
        form.resetFields();
      }}
      onFinish={handleSubmit}
    />
    </>
  );
}