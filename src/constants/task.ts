export const statusOptions =
    [
        {
            value: 'todo',
            label: 'Todo',
        },

        {
            value: 'in_progress',
            label: 'In Progress',
        },

        {
            value: 'done',
            label: 'Done',
        },
    ];

export const statusColorMap = {
    todo: "default",
    in_progress: "processing",
    done: "success",
};

export const priorityColorMap = {
    high: "error",
    medium: "warning",
    low: "success",
};

export const priorityOrder = {
    low: 1,
    medium: 2,
    high: 3,
};

