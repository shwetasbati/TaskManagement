import { useState } from "react";

function CreateTask({ userId, onTaskCreated }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [priority, setPriority] = useState("HIGH");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {

    const response = await fetch(
      `http://localhost:8080/api/tasks/user/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: description,
          status: status,
          priority: priority,
          dueDate: dueDate
        })
      }
    );

    if (response.ok) {

      const newTask = await response.json();

      alert("Task created successfully");

      onTaskCreated(newTask);

      setTitle("");
      setDescription("");
      setStatus("IN_PROGRESS");
      setPriority("HIGH");
      setDueDate("");

    } else {

      alert("Failed to create task");

    }
  };

  return (
    <div>

      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="IN_PROGRESS">In Progress</option>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <br /><br />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br /><br />

    <button className="create-btn">
  Create Task
</button>

    </div>
  );
}

export default CreateTask;