const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Load tasks from file
let tasks = [];
try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    tasks = JSON.parse(data);
} catch (err) {
    console.log('No tasks found, starting fresh.');
}

// OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Routes
// Test Route
app.get('/', (req, res) => {
    res.send('AI Task Manager Backend is running.');
});

// Add Task (with AI parsing)
app.post('/add-task', async (req, res) => {
    const { userInput } = req.body;

    try {
        // Use OpenAI to parse user input into a structured task
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Extract a structured task from the following input: "${userInput}". Return it in this format: { "task": "task description", "dueDate": "YYYY-MM-DD" }`,
            max_tokens: 50,
        });

        const task = JSON.parse(completion.data.choices[0].text.trim());
        tasks.push(task);

        // Save tasks to file
        fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
        res.status(200).json({ message: 'Task added successfully!', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add task', error: err.message });
    }
});

// Get All Tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
