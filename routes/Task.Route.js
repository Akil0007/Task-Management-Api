const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/Task.Controller");
const { authMiddleWare } = require("../auth/auth");
const errorHandler = require("../errorHandler");
const { validateTask, validateTaskUpdate } = require("../validate/validate");
const taskRouter = express.Router();

taskRouter.post("/createTask", validateTask, authMiddleWare, createTask);
taskRouter.get("/tasks", authMiddleWare, getAllTasks);
taskRouter.get("/task/:id", authMiddleWare, getTaskById);
taskRouter.put("/task/:id", validateTaskUpdate, authMiddleWare, updateTask);
taskRouter.delete("/task/:id", authMiddleWare, deleteTask);

// global error handler
taskRouter.use(errorHandler);

module.exports = taskRouter;
