// src/Register.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/api/v1/user/register", {
                email,
                username,
                password,
            });
            if (response.status === 201) {
                alert("User registered successfully");
                navigate("/login");
            } else {
                alert(`Failed to register user 1 ${response.status}`);
            }
        } catch (error) {
            alert(`Failed to register user ${error}`);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>ثبت نام</h1>
                <div className="flex flex-col justify-start gap-4 my-6">
                    <div className="input_group">
                        <label htmlFor="email">ایمیل</label>
                        <input
                            name="email"
                            id="email"
                            className="p-2 rounded-md"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                        ثبت نام
                    </button>
                    <button
                        type="button"
                        onClick={handleLoginRedirect}
                        className="p-2 bg-gray-500 text-white rounded-md mt-2"
                    >ورود</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
