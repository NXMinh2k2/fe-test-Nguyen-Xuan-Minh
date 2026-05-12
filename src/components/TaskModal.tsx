import {
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  type FormInstance,
} from 'antd';
import type { Task } from '../types/tasks';


interface Props {
  open: boolean;
  form: FormInstance<Task>;
  onCancel: () => void;
  onFinish: (values: Task) => void;
}

export default function TaskModal({
  open,
  form,
  onCancel,
  onFinish,
}: Props) {
  return (
    <Modal
      open={open}
      centered
      destroyOnHidden
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message:
                'Please enter title',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message:
                'Please select status',
            },
          ]}
        >
          <Select
            options={[
              {
                value: 'todo',
                label: 'Todo',
              },

              {
                value:
                  'in_progress',

                label:
                  'In Progress',
              },

              {
                value: 'done',
                label: 'Done',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[
            {
              required: true,
              message:
                'Please select priority',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="low">
              Low
            </Radio>

            <Radio value="medium">
              Medium
            </Radio>

            <Radio value="high">
              High
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Assignee"
          name="assignee"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
        >
          <Select
            mode="tags"
            placeholder="Enter tags"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}