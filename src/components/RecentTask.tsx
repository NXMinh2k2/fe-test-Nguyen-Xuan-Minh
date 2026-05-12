import { Row,  } from 'antd';
import type { Task } from '../types/tasks';
import { formatDate } from '../utils/task';

interface Props {
  task: Task
}

export default function RecentTask({ task }: Props) {

  return (
    <Row className='mb-8' justify='space-between' align="middle">
        <p className='m-0'>{task.title}</p>
        <p>{formatDate(task.dueDate)}</p>
    </Row>
  );
}