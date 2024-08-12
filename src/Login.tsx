// src/Login.tsx
import { useState, FormEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Popup from "./components/Popup";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const throwNewMessage = (_message: string) => {
    setMessage(_message);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5001/api/v1/user/login", {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        onLogin(username);
        navigate("/");
      })
      .catch((error) => {
        throwNewMessage(error.message);
      });
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
        <div className='my-6 flex flex-col justify-start gap-4'>
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
            ورود
          </button>
          <div className='flex flex-row justify-center gap-3'>
            <button
              type='button'
              onClick={handleResetPasswordRedirect}
              className='mt-2 rounded-md bg-gray-500 px-6 py-4 text-white'
            >
              بازیابی رمز عبور
            </button>
            <button
              type='button'
              onClick={handleRegisterRedirect}
              className='mt-2 rounded-md bg-gray-500 px-6 py-4 text-white'
            >
              ثبت نام
            </button>
          </div>
        </div>
      </form>
      {message && <Popup message={message} />}
    </div>
  );
};

export default Login;
