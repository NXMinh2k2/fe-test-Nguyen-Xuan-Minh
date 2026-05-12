import { describe, it, expect } from 'vitest';
import type { RootState } from './store';
import { selectTaskStats } from './features/tasks/taskSelectors';

describe('selectTaskStats', () => {
    it('Hiển thị đúng số lượng task theo trạng thái', () => {
        const mockState = {
            tasks: {
                items: [
                    {
                        id: '1',
                        title: 'Task A',
                        status: 'todo',
                        priority: 'low',
                        createdAt: new Date().toISOString(),
                    },
                    {
                        id: '2',
                        title: 'Task B',
                        status: 'done',
                        priority: 'high',
                        createdAt: new Date().toISOString(),
                    },
                ],
                filters: {
                    searchText: '',
                    status: [],
                    priority: null,
                    dateRange: null,
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                },
            },
        } as RootState;

        const result = selectTaskStats(mockState);

        expect(result.total).toBe(2);
        expect(result.todo).toBe(1);
        expect(result.done).toBe(1);
    });
});