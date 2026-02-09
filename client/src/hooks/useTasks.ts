export const useTasks = () => {
  const tasks = [
    { id: "1", title: "Sample Task", description: "Demo task" },
  ];

  const getTaskById = (id: string) =>
    tasks.find((t) => t.id === id);

  const createTask = (title: string) => {
    console.log("Create task:", title);
  };

  return { tasks, getTaskById, createTask };
};
