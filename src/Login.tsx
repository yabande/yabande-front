// src/Login.tsx
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { IMessageState, MessageContext } from "./contexts/MessageContext";
import { IUserState, UserContext } from "./contexts/UserContext";

function Login() {
  const { setUser } = useContext(UserContext) as IUserState;
  const { throwNewMessage } = useContext(MessageContext) as IMessageState;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(username: string) {
    setUser(username);
    localStorage.setItem("username", username);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await axios
      .post(`${import.meta.env.VITE_RELAY_URL}/api/v1/user/login`, {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        handleLogin(username);
        navigate("/");
      })
      .catch((error) => {
        throwNewMessage(error.response.data.error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegisterRedirect() {
    navigate("/register");
  }

  function handleResetPasswordRedirect() {
    navigate("/reset-password");
  }

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
            <p className='flex justify-center gap-5'>
              {isLoading && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6 animate-spin'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                  />
                </svg>
              )}
              ورود
            </p>
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
    </div>
  );
}

export default Login;
