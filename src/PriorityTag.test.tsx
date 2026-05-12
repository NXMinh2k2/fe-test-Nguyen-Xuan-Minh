import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PriorityTag from './components/PriorityTag';

describe(
  'PriorityTag',
  () => {
    it(
      'Hiển thị đúng mức độ ưu tiên',
      () => {
        render(
          <PriorityTag
            priority="high"
          />
        );

        expect(
          screen.getByText(
            'high'
          )
        ).toBeInTheDocument();
      }
    );
  }
);