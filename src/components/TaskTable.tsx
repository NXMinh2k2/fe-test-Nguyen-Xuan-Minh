import { Button, DatePicker, Empty, Form, Input, Popconfirm, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Priority, Status, Task } from '../types/tasks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addTask, deleteManyTasks, deleteTask, resetFilters, setFilter, setPage, updateTask, updateTaskStatus } from '../features/tasks/taskSlice';
import TaskModal from './TaskModal';
import { selectPagination } from '../features/tasks/taskSelectors';
import StatusSelect from './StatusSelect';
import PriorityTag from './PriorityTag';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { priorityOrder, statusOptions } from '../constants/task';
import { formatDate } from '../utils/task';
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
    (pagination.currentPage - 1) * pagination.pageSize + index + 1,
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
     <StatusSelect
      value={status}
      onChange={(value) =>
        handleStatusChange(
          record,
          value
        )
      }
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
      <PriorityTag
        priority={priority}
      />
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
    render: (dueDate: string) => formatDate(dueDate),
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

const [editingTask, setEditingTask] = useState<Task | null>(null);
const [open, setOpen] = useState(false);
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
const [loading, setLoading] = useState(false);

const [form] = Form.useForm();
const pagination = useSelector(selectPagination);
const {
  dispatch,
  filters,
  searchValue,
  handleSearchChange,
} = useTaskFilters();

const handleSubmit = async (values: Task) => {
  setLoading(true);
  try {
    if (editingTask) {
      dispatch(
        updateTask({
          ...editingTask,
          ...values,
        })
      );
    } else {
      dispatch(
        addTask({
          ...values,
          id: crypto.randomUUID(),
        })
      );
    }
    setOpen(false);

    form.resetFields();
  } finally {
    setLoading(false);
  }
};

const handleStatusChange = (
  task: Task,
  status: Status
) => {
  dispatch(
    updateTaskStatus({
      ...task,
      status,
    })
  );
};

  return (
    <>
      <h2 className="text-xl">
        Task Management
      </h2>

      <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="Search task"
            allowClear
            onChange={(e) =>
              handleSearchChange(e.target.value)
            }
            value={searchValue}
          />

          <Select
            style={{ width: '150px' }}
            mode="multiple"
            placeholder="status"
            onChange={(value) =>
              dispatch(
                setFilter({
                  status: value,
                })
              )
            }
            value={filters.status}
            options={statusOptions}
          />

         <Select
            style={{ width: '150px' }}
            allowClear
            placeholder="Priority"
            onChange={(value) =>
              dispatch(
                setFilter({
                  priority: value,
                })
              )
            }
            value={filters.priority}
            options={[
              {
                value: 'low',

                label: (
                  <Tag color="success">
                    Low
                  </Tag>
                ),
              },

              {
                value: 'medium',

                label: (
                  <Tag color="warning">
                    Medium
                  </Tag>
                ),
              },

              {
                value: 'high',

                label: (
                  <Tag color="error">
                    High
                  </Tag>
                ),
              },
            ]}
          />

         <DatePicker.RangePicker
            onChange={(dates) => {
              dispatch(
                setFilter({
                  dateRange: dates
                    ? [
                        dates[0]?.toISOString(),
                        dates[1]?.toISOString(),
                      ]
                    : null,
                })
              );
            }}
            value={filters.dateRange ? 
              [dayjs(filters.dateRange[0]),
              dayjs( filters.dateRange[1]),]
              : null
  }

          />

          <Button
            type='primary'
            onClick={() =>
              dispatch(resetFilters())
            }
          >
            Reset
          </Button>

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
                deleteManyTasks(selectedRowKeys as string[])
              );

              setSelectedRowKeys([]);
            }}
          >
            Delete Selected
          </Button>
      </Space>

      <Table
        showSorterTooltip={{ title: "Sắp xếp"}}
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        pagination={{
          showTotal: (total) => `Tổng ${total} tasks`,
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          onChange: (page) =>
            dispatch(setPage(page)),
        }}
        rowSelection={{
          selectedRowKeys,

          onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
          },
        }}
        locale={{
          emptyText: (
            <Empty
              description="No tasks found :(("
            />
          ),
  }}
      />

    <TaskModal
      open={open}
      loading={loading}
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

