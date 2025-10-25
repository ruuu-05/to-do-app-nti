const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  updateTodo,
  toggleDone,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.use(authenticate);

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id/toggle", toggleDone);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
