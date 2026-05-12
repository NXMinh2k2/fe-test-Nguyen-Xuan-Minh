import {
  Select,
  Tag,
} from 'antd';

import type {
  Status,
} from '../types/tasks';

interface Props {
  value: Status;

  onChange: (
    value: Status
  ) => void;
}

export default function StatusSelect({
  value,
  onChange,
}: Props) {
  return (
    <Select
      value={value}
      style={{ width: 140 }}
      onChange={onChange}
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
          value:
            'in_progress',

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
  );
}