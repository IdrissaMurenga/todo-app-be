import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask } from "../controllers/todoController.js";

const router = express.Router()

// Create a new task
router.post("/", createTask);

// Get all tasks
router.get("/", getAllTasks);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;