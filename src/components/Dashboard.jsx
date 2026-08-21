import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import "../App.css";

function Dashboard({ userId, onLogout }) {

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);


  const getTasks = () => {

    fetch(`http://localhost:8080/api/tasks/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });

  };


  useEffect(() => {
    getTasks();
  }, [userId]);


 
  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };



  const deleteTask = async (id) => {

    const response = await fetch(
      `http://localhost:8080/api/tasks/${id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {

      alert("Task deleted successfully");

      setTasks(
        tasks.filter(task => task.id !== id)
      );

    } else {
      alert("Failed to delete task");
    }
  };



  const updateTask = async () => {

    const response = await fetch(
      `http://localhost:8080/api/tasks/${editingTask.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editingTask)
      }
    );

    if (response.ok) {

      const updatedTask = await response.json();

      setTasks(
        tasks.map(task =>
          task.id === updatedTask.id
            ? updatedTask
            : task
        )
      );

      setEditingTask(null);

      alert("Task updated successfully");

    } else {
      alert("Failed to update task");
    }
  };


  return (

    <div className="container">

      {/* Dashboard Header */}

      <div className="dashboard-header">

        <h1>Task Dashboard</h1>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>


      

      <CreateTask
        userId={userId}
        onTaskCreated={handleTaskCreated}
      />


    

      <h2>My Tasks</h2>


      {tasks.length === 0 ? (

        <p>No tasks found</p>

      ) : (

        tasks.map(task => (

          <div
            className="card"
            key={task.id}
          >

            <h3>{task.title}</h3>

            <p>
              {task.description}
            </p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Due Date:</strong> {task.dueDate}
            </p>


           
            <button
              className="edit-btn"
              onClick={() => setEditingTask(task)}
            >
              Edit
            </button>


         

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

          </div>

        ))

      )}


      

      {editingTask && (

        <div className="card edit-card">

          <h2>Edit Task</h2>


      

          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                title: e.target.value
              })
            }
            placeholder="Task title"
          />


          
          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                description: e.target.value
              })
            }
            placeholder="Task description"
          />




          <select
            value={editingTask.status}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                status: e.target.value
              })
            }
          >

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="COMPLETED">
              Completed
            </option>

          </select>


        

          <select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                priority: e.target.value
              })
            }
          >

            <option value="HIGH">
              High
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="LOW">
              Low
            </option>

          </select>


         

          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                dueDate: e.target.value
              })
            }
          />


          

          <button
            className="update-btn"
            onClick={updateTask}
          >
            Update Task
          </button>


        

          <button
            className="cancel-btn"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>

        </div>

      )}

    </div>
  );
}

export default Dashboard;