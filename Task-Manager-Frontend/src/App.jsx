import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import "./styles.css";


const App = () => {
    const [tasks, setTasks] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [importance, setImportance] = useState("Medium");
    const [showConfetti, setShowConfetti] = useState(false);
    const [theme, setTheme] = useState("light");

    // Fetch tasks on load
    useEffect(() => {
        axios
            .get("http://localhost:3000/tasks")
            .then((response) => setTasks(response.data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

    // Handle adding a task
    const handleAddTask = (e) => {
        e.preventDefault();

        // Validate input
        if (!userInput.trim()) {
            alert("Task description cannot be empty!");
            return;
        }

        axios
            .post("http://localhost:3000/add-task", { userInput, importance })
            .then((response) => {
                const newTask = {
                    ...response.data.task,
                    completed: false,
                    importance,
                };
                setTasks((prevTasks) => [...prevTasks, newTask]);
                setUserInput("");
                setImportance("Medium");
            })
            .catch((error) => console.error("Error adding task:", error));
    };

    // Handle completing/uncompleting a task
    const handleToggleCompleteTask = (index) => {
        const task = tasks[index];

        // Update the task completion state locally
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !task.completed;
        setTasks(updatedTasks);

        // Only show confetti if marking as complete
        if (updatedTasks[index].completed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }

        // Send update to the server
        axios
            .put(`http://localhost:3000/tasks/${index}`, updatedTasks[index])
            .catch((error) => console.error("Error updating task:", error));
    };

    // Handle deleting a task
    const handleDeleteTask = (index) => {
        axios
            .delete(`http://localhost:3000/tasks/${index}`)
            .then(() => {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
            })
            .catch((error) => console.error("Error deleting task:", error));
    };

    // Handle theme toggle
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className="container">
            {showConfetti && (
                <Confetti
                    numberOfPieces={50}
                    gravity={.05}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    initialVelocityX={12}
                    initialVelocityY={25}
                    confettiSource={{ x: 10, y: window.innerHeight, w: window.innerWidth, h: 25 }}
                />
            )}
            <div className="theme-toggle">
                <button onClick={toggleTheme}>
                    {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                </button>
            </div>
            <h1>Task Manager</h1>
            <form className="add-task-form" onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <select
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
            <ul className="task-list">
    {tasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
            {/* First Row: Checkbox and Task Description */}
            <div className="task-row">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleteTask(index)}
                />
                <span className="task">{task.task}</span>
            </div>
            {/* Second Row: Metadata */}
            <div className="meta-row">
                <span className="due-date">{task.dueDate}</span>
                <span
                    className={`importance ${
                        task.importance?.toLowerCase() || "medium"
                    }`}
                >
                    {task.importance || "Medium"}
                </span>
                <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(index)}
                >
                    Delete
                </button>
            </div>
        </li>
    ))}
</ul>

        </div>
    );
};

export default App;
