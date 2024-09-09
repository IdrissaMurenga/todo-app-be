import mongoose from "mongoose";
import Todo from "../model/todoModel.js";

// create a new task
const createTask = async (req, res) => {
    const { text, dueDate, completed, } = req.body;
    if (!text) return res.status(400).json({ message: "Please provide a task text." });
    try {
        const newTask = await Todo.create({
            text,
            dueDate,
            completed,
        })
        res.status(200).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Todo.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// update tasks
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { text, dueDate, completed } = req.body;
    try {        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Task not found." });
    
        const updateTask = await Todo.findByIdAndUpdate({ _id: id }, {text, dueDate, completed}, {...req.body}, {new: true});
    
        if (!updateTask) return res.status(404).json({ message: "Task not found." });
    
        res.status(200).json(updateTask);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

// delete task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Task not found." });

        const deletedTask = await Todo.findByIdAndDelete(id);

        if (!deletedTask) return res.status(404).json({ message: "Task not found." });

        res.status(200).json(deletedTask);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
}

export { createTask, getAllTasks, updateTask, deleteTask };