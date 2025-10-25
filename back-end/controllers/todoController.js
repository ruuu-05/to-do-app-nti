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

function getTodos(req, res) {
  console.log('🔧 getTodos called for userId:', req.userId);
  const tasks = readTasks();
  console.log('🔧 All tasks in file:', tasks);
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  console.log('🔧 Filtered tasks for user:', userTasks);
  res.json(userTasks);
}

function createTodo(req, res) {
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

function updateTodo(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  let updated = null;
  const updatedTasks = tasks.map((task) => {
    const taskIdNum = typeof task.id === 'string' ? parseInt(task.id) : task.id;
    if (taskIdNum === taskId && task.userId === req.userId) {
      updated = { ...task, text: req.body.text, done: req.body.done };
      return updated;
    }
    return task;
  });
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  writeTasks(updatedTasks);
  res.json(updated);
}

function toggleDone(req, res) {
  console.log('🔧 toggleDone called with taskId:', req.params.id);
  console.log('🔧 userId from token:', req.userId);
  
  const tasks = readTasks();
  console.log('🔧 Current tasks:', tasks);
  
  const taskId = parseInt(req.params.id);
  console.log('🔧 Parsed taskId:', taskId);
  
  let updated = null;
  const updatedTasks = tasks.map((task) => {
    // Compare both as numbers to avoid type issues
    const taskIdNum = typeof task.id === 'string' ? parseInt(task.id) : task.id;
    if (taskIdNum === taskId && task.userId === req.userId) {
      console.log('🔧 Found task to toggle:', task);
      updated = { ...task, done: !task.done };
      console.log('🔧 Updated task:', updated);
      return updated;
    }
    return task;
  });
  
  if (!updated) {
    console.log('❌ Task not found or user mismatch');
    return res.status(404).json({ error: "Todo not found" });
  }
  
  console.log('✅ Writing updated tasks to file');
  writeTasks(updatedTasks);
  res.json(updated);
}

function deleteTodo(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const exists = tasks.some((task) => {
    const taskIdNum = typeof task.id === 'string' ? parseInt(task.id) : task.id;
    return taskIdNum === taskId && task.userId === req.userId;
  });
  if (!exists) return res.status(404).json({ error: "Todo not found" });
  const filteredTasks = tasks.filter((task) => {
    const taskIdNum = typeof task.id === 'string' ? parseInt(task.id) : task.id;
    return !(taskIdNum === taskId && task.userId === req.userId);
  });
  writeTasks(filteredTasks);
  res.json({ message: "Deleted successfully" });
}

module.exports = {
  readTasks,
  writeTasks,
  getTodos,
  createTodo,
  updateTodo,
  toggleDone,
  deleteTodo,
};
