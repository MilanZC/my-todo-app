// 1. Select the HTML elements
const loadBtn = document.getElementById("loadBtn");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// 2. Logic to LOAD tasks from the server (GET)
loadBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(tasks => {
      taskList.innerHTML = ""; // Clear the list first

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;

        // Create a delete button for each task
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        
        // Add click event to call the deleteTask function
        deleteBtn.addEventListener("click", () => {
          deleteTask(task.id); 
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    })
    .catch(err => console.error("Error loading tasks:", err));
});

// 3. Logic to ADD a new task to the server (POST)
addBtn.addEventListener("click", () => {
  const title = taskInput.value;

  if (title === "") {
    alert("Please type something!");
    return;
  }

  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: title })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Success:", data);
    taskInput.value = ""; // Clear the input box
    loadBtn.click();      // Refresh the list automatically
  })
  .catch(err => console.error("Error adding task:", err));
});

// 4. Function to DELETE a task from the server (DELETE)
function deleteTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    console.log("Deleted:", data.message);
    loadBtn.click(); // Refresh the list automatically after deleting
  })
  .catch(err => console.error("Error deleting task:", err));
}