require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB: OK"))
    .catch((err) => console.error("Error:", err));

// Object schema
const TaskSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        done: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

// GET request
app.get("/tasks", async (_, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST request
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE request
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH request
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { done } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { done },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
