import mongoose from "mongoose";
const Schema = mongoose.Schema

// Define the schema for the Todo model

const todoSchema = new Schema({
    text: { type: String, required: true },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create the Todo model from the schema
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;