// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Import custom styles

function App() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);

    const fetchUserData = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:5000/api/user/${username}`);
            setUserData(userResponse.data);

            const reposResponse = await axios.get(`http://localhost:5000/api/user/${username}/repos`);
            setRepos(reposResponse.data);
        } catch (error) {
            alert('User not found');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">GitHub Profile Analyzer</h1>
            <div className="text-center mb-4">
                <input 
                    type="text" 
                    className="form-control w-50 mx-auto" 
                    placeholder="Enter GitHub username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <button className="btn btn-primary mt-3" onClick={fetchUserData}>Analyze</button>
            </div>

            {userData && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h2>{userData.login}</h2>
                    </div>
                    <div className="card-body text-center">
                        <img src={userData.avatar_url} alt="Avatar" width="100" className="rounded-circle mb-3" />
                        <p>{userData.bio}</p>
                        <p>Followers: {userData.followers} | Following: {userData.following}</p>
                        <p>Public Repositories: {userData.public_repos}</p>
                    </div>
                </div>
            )}

            {repos.length > 0 && (
                <div className="card">
                    <div className="card-header">
                        <h3>Repositories:</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                        {repos.map(repo => (
                            <li key={repo.id} className="list-group-item">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a> - {repo.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;