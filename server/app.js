require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Task schema
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
app.get("/getTasks", async (_, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST request
app.post("/addNewTask", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Task text is required" });
        }

        const newTask = new Task({ text });
        await newTask.save();

        res.status(201).json({ newTask: newTask, message: "New task added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE request
app.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH request
app.patch("/changeTaskState/:id", async (req, res) => {
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

        res.status(200).json({ message: "Task state successfully changed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`));