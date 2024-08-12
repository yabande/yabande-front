// src/ResetPassword.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const ResetPassword: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const handleSendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/reset",
        { username },
      );

      if (response.data.error) {
        alert(response.data.error[0]);
      } else {
        alert("OTP sent successfully");
        setStep(2);
      }
    } catch (error) {
      alert(`Failed to send OTP: ${error}`);
    }
  };

  const handleConfirmReset = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/process-reset",
        { username, otp, newPassword },
      );

      if (response.status === 200) {
        alert("Password reset successfully");
        navigate("/login");
      } else {
        alert(`Failed to reset password: ${response.status}`);
      }
    } catch (error) {
      alert(`Failed to reset password: ${error}`);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={step === 1 ? handleSendOtp : handleConfirmReset}>
        <h1>فراموشی رمز عبور</h1>
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
          {step === 2 && (
            <>
              <div className='input_group'>
                <label htmlFor='otp'>کد تایید</label>
                <input
                  name='otp'
                  id='otp'
                  className='rounded-md p-2'
                  placeholder='Confirmation Code'
                  type='text'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className='input_group'>
                <label htmlFor='newPassword'>رمز عبور جدید</label>
                <input
                  name='newPassword'
                  id='newPassword'
                  className='rounded-md p-2'
                  placeholder='New Password'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </>
          )}
          <button
            type='submit'
            className='rounded-md bg-blue-500 p-2 text-white'
          >
            {step === 1 ? "ارسال کد تایید" : "تایید تغییر رمز عبور"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
