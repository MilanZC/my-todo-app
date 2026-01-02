const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Read tasks from the JSON file at the start
let tasks = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));

// Root route to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// GET route to send all tasks to the frontend
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST route to add a new task
app.post("/tasks", (req, res) => {
  const taskTitle = req.body.title;

  const newTask = {
    id: tasks.length + 1,
    title: taskTitle
  };

  // 1. Add the new task to the array first
  tasks.push(newTask);

  // 2. Then save the updated array to the JSON file
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));

  res.json(newTask);
});

// DELETE route to remove a task by ID
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Filter out the task with the given ID
  tasks = tasks.filter(t => t.id !== id);

  // Save the updated list to the file
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));

  res.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});