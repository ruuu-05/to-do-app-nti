const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  const tasks = JSON.parse(data || "[]");
  
  // Clean up any tasks that have 'completed' property instead of 'done'
  const cleanedTasks = tasks.map(task => {
    if (task.hasOwnProperty('completed') && !task.hasOwnProperty('done')) {
      // Convert 'completed' to 'done'
      return {
        ...task,
        done: task.completed,
        completed: undefined
      };
    } else if (task.hasOwnProperty('completed') && task.hasOwnProperty('done')) {
      // Remove 'completed' property if both exist
      const { completed, ...cleanTask } = task;
      return cleanTask;
    }
    return task;
  });
  
  // If any tasks were cleaned, save the cleaned data
  if (JSON.stringify(tasks) !== JSON.stringify(cleanedTasks)) {
    console.log('🧹 Cleaned up mixed data properties');
    writeTasks(cleanedTasks);
  }
  
  return cleanedTasks;
}

function writeTasks(tasks) {
  // Ensure only 'done' properties are saved
  const cleanTasks = tasks.map(task => {
    const { completed, ...cleanTask } = task;
    return cleanTask;
  });
  fs.writeFileSync(filePath, JSON.stringify(cleanTasks, null, 2));
}

function getAllTasks(req, res) {
  const tasks = readTasks();
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  res.json(userTasks);
}

function createTask(req, res) {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    done: false,
    userId: req.userId,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId && task.userId === req.userId
      ? { ...task, text: req.body.text }
      : task
  );
  writeTasks(updatedTasks);
  res.json({ message: "Task updated" });
}

function toggleTaskDone(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId && task.userId === req.userId
      ? { ...task, done: !task.done }
      : task
  );
  writeTasks(updatedTasks);
  res.json({ message: "Task marked done/undone" });
}

function deleteTask(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const filteredTasks = tasks.filter(
    (task) => !(task.id === taskId && task.userId === req.userId)
  );
  writeTasks(filteredTasks);
  res.json({ message: "Task deleted" });
}

module.exports = {
  readTasks,
  writeTasks,
  getAllTasks,
  createTask,
  updateTask,
  toggleTaskDone,
  deleteTask,
};
