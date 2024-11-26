// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware authentification
app.use(cors());
app.use(express.json());

// GitHub API base URL
const GITHUB_API_URL = 'https://api.github.com';

// Middleware to authenticate with GitHub API
const githubAuthMiddleware = (req, res, next) => {
    req.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    next();
};

app.use(githubAuthMiddleware);

// Define route 
app.get('/', (req, res) => {
    res.send('Welcome to the GitHub Profile Analyzer API!');
});

// Fetch user profile
app.get('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
            headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
});

// Fetch user repositories
app.get('/api/user/:username/repos', async (req, res) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
            headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: 'Repositories not found' });
    }
});

//server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});