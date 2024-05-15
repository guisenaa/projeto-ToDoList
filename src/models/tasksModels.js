const connection = require("./connection");

const getAll = async () => {
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks[0];
};

const createTask = async (task) => {
  const { title } = task;

  const dataUTC = new Date(Date.now()).toUTCString();

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";

  const [createdTask] = await connection.execute(query, [
    title,
    "pendente",
    dataUTC,
  ]);
  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return removedTask;
};

const updateTasks = async (id, task) => {
  const { title, status } = task;

  const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";

  const updatedTask = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTasks,
};
