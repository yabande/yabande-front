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
          <div className='flex flex-row gap-3 justify-center'>
            <button
              type='button'
              onClick={handleResetPasswordRedirect}
              className='px-6 py-4 bg-gray-500 text-white rounded-md mt-2'
            >
              بازیابی رمز عبور
            </button>
            <button
              type='button'
              onClick={handleRegisterRedirect}
              className='px-6 py-4 bg-gray-500 text-white rounded-md mt-2'
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
