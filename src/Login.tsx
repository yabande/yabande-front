// src/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Assuming this file contains the necessary CSS

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/api/login", {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            onLogin(username); // Pass username to App
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>ورود</h1>
                <div className="flex flex-col justify-start gap-4 my-6">
                    <div className="input_group">
                        <label htmlFor="username">نام کاربری</label>
                        <input
                            name="username"
                            id="username"
                            className="p-2 rounded-md"
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input_group">
                        <label htmlFor="password">رمز عبور</label>
                        <input
                            name="password"
                            id="password"
                            className="p-2 rounded-md"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
                        ورود
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
