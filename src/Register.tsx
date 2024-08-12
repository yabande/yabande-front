// src/Register.tsx
import axios from "axios";
import React, { useState } from "react";
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
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/register",
        {
          email,
          username,
          password,
        },
      );
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
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>ثبت نام</h1>
        <div className='my-6 flex flex-col justify-start gap-4'>
          <div className='input_group'>
            <label htmlFor='email'>ایمیل</label>
            <input
              name='email'
              id='email'
              className='rounded-md p-2'
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input_group'>
            <label htmlFor='username'>نام کاربری</label>
            <input
              name='username'
              id='username'
              className='rounded-md p-2'
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
              className='rounded-md p-2'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='rounded-md bg-blue-500 p-2 text-white'
          >
            ثبت نام
          </button>
          <button
            type='button'
            onClick={handleLoginRedirect}
            className='mt-2 rounded-md bg-gray-500 p-2 text-white'
          >
            ورود
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
