import { Row,  } from 'antd';
import type { Task } from '../types/tasks';
import dayjs from 'dayjs';

interface Props {
  task: Task
}

export default function RecentTask({ task }: Props) {

  return (
    <Row className='mb-8' justify='space-between' align="middle">
        <p className='m-0'>{task.title}</p>
        <p>{dayjs(task?.dueDate).format('DD/MM/YYYY')}</p>
    </Row>
  );
}