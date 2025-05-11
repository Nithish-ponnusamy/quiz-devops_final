import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector'; // Use LanguageSelector for the language dropdown
import './Login.css'; // Import the updated CSS file

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && selectedLanguage) {
            handleLogin(username, selectedLanguage); // Pass username and language to the parent (App)
        } else {
            setError('Please enter a username and select a language');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="text-center">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Language</label>
                        <LanguageSelector setSelectedLanguage={setSelectedLanguage} />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                        Start Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
