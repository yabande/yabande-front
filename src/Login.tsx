// src/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/login",
        {
          username,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      onLogin(username);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleResetPasswordRedirect = () => {
    navigate("/reset-password");
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>ورود</h1>
        <div className='flex flex-col justify-start gap-4 my-6'>
          <div className='input_group'>
            <label htmlFor='username'>نام کاربری</label>
            <input
              name='username'
              id='username'
              className='p-2 rounded-md'
              placeholder='Username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='input_group'>
            <label htmlFor='password'>رمز عبور</label>
            <input
              name='password'
              id='password'
              className='p-2 rounded-md'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='p-2 bg-blue-500 text-white rounded-md'
          >
            ورود
          </button>
          <button
            type='button'
            onClick={handleResetPasswordRedirect}
            className='p-2 bg-gray-500 text-white rounded-md mt-2'>
            بازیابی رمز عبور
          </button>
          <button
            type='button'
            onClick={handleRegisterRedirect}
            className='p-2 bg-gray-500 text-white rounded-md mt-2'
          >
            ثبت نام
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
