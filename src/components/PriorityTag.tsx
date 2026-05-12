import { Tag } from 'antd';
import type {Priority} from '../types/tasks';
import { priorityColorMap } from '../constants/task';

interface Props {
  priority: Priority;
}

export default function PriorityTag({
  priority,
}: Props) {
  return (
    <Tag
      color={priorityColorMap[priority]}
    >
      {priority}
    </Tag>
  );
}